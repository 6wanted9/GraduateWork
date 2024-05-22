import React from "react";
import { MailingAccountsList } from "../components/mailingAccounts/mailingAccountsList";
import { AddMailingAccountComponent } from "../components/mailingAccounts/addMailingAccountComponent";

export const MailingAccountsPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Mailing Accounts</h1>
      <MailingAccountsList />
      <AddMailingAccountComponent />
    </div>
  );
};
