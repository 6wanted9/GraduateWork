import React, { useEffect, useState } from "react";
import {
  CodeResponse,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { Button } from "@mui/material";

export const AddMailingAccountComponent = () => {
  const [tokenResponse, setTokenResponse] = useState<CodeResponse>();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setTokenResponse(codeResponse);
    },
    onError: () => console.log("Login Failed:"),
    flow: "auth-code",
    scope: "openid profile email https://www.googleapis.com/auth/gmail.send",
    overrideScope: true,
  });

  const createMailingAccount = async (code: string) => {
    const response = await Api.post(apiUrls.mailingAccounts.list, {
      token: code,
    });
  };

  useEffect(() => {
    if (tokenResponse && tokenResponse.code) {
      createMailingAccount(tokenResponse.code).catch(console.error);
    }
  }, [tokenResponse]);

  const logOut = () => {
    googleLogout();
  };

  return <Button onClick={() => login()}>ADD AN ACCOUNT</Button>;
};
