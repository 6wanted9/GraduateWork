import React, { useEffect, useState } from "react";
import { MailingAccountsList } from "../components/mailingAccounts/mailingAccountsList";
import { AddMailingAccountComponent } from "../components/mailingAccounts/addMailingAccountComponent";
import { MailingAccountViewModel } from "../dataModels/mailingAccounts/mailingAccountViewModel";
import Api from "../utils/Api";
import { apiUrls } from "../constants/api";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";

export const MailingAccountsPage = () => {
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

  return (
    <Box
      sx={{ height: "100%" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Typography variant="h2" gutterBottom>
        Mailing Accounts
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <MailingAccountsList mailingAccounts={mailingAccounts} />
          <AddMailingAccountComponent
            refetchMailingAccounts={getMailingAccounts}
          />
        </>
      )}
    </Box>
  );
};
