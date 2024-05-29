import React, { useEffect, useState } from "react";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { ErrorMessages } from "../../constants/errorMessages";

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
      toast.error(ErrorMessages.DefaultError);
    }
  };

  useEffect(() => {
    if (tokenResponse && tokenResponse.code) {
      createMailingAccount(tokenResponse.code);
    }
  }, [tokenResponse]);

  return <Button onClick={() => login()}>ADD AN ACCOUNT</Button>;
};
