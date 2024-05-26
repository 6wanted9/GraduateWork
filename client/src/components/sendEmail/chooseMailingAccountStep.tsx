import { MailingAccountsList } from "../mailingAccounts/mailingAccountsList";
import React, { useEffect, useState } from "react";
import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { SendEmailProps } from "../../constants/sendEmail/sendEmailProps";

export const ChooseMailingAccountStep = (props: SendEmailProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mailingAccounts, setMailingAccounts] = useState<
    Array<MailingAccountViewModel>
  >([]);

  const getMailingAccounts = async () => {
    setIsLoading(true);
    try {
      const accounts: Array<MailingAccountViewModel> = await Api.get(
        apiUrls.mailingAccounts.list,
      );
      setMailingAccounts(accounts);
    } catch (e) {
      toast.error("Some error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMailingAccounts();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <MailingAccountsList
      mailingAccounts={mailingAccounts}
      onClick={(value) => props.setValue("mailingAccount", value)}
    />
  );
};
