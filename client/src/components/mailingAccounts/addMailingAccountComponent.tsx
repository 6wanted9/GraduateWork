import React, { useEffect, useState } from "react";
import {
  CodeResponse,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  refetchMailingAccounts: () => Promise<void>;
}

export const AddMailingAccountComponent = (props: Props) => {
  const [tokenResponse, setTokenResponse] = useState<CodeResponse>();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setTokenResponse(codeResponse);
    },
    flow: "auth-code",
    scope: "openid profile email https://www.googleapis.com/auth/gmail.send",
    overrideScope: true,
  });

  const createMailingAccount = async (code: string) => {
    try {
      await Api.post(apiUrls.mailingAccounts.list, {
        token: code,
      });

      await props.refetchMailingAccounts();
    } catch (e) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    if (tokenResponse && tokenResponse.code) {
      createMailingAccount(tokenResponse.code);
    }
  }, [tokenResponse]);

  const logOut = () => {
    googleLogout();
  };

  return <Button onClick={() => login()}>ADD AN ACCOUNT</Button>;
};
