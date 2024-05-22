import React from "react";
import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import { MailingAccountItem } from "./mailingAccountItem";

interface Props {
  mailingAccounts: Array<MailingAccountViewModel>;
}

export const MailingAccountsList = (props: Props) => {
  return (
    <div className="d-flex ">
      {props.mailingAccounts.map((mailingAccount, index) => (
        <MailingAccountItem key={index} account={mailingAccount} />
      ))}
    </div>
  );
};
