import React, { Dispatch } from "react";
import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import { MailingAccountItem } from "./mailingAccountItem";

interface Props {
  mailingAccounts: Array<MailingAccountViewModel>;
  mailingAccountsCallback: Dispatch<
    React.SetStateAction<MailingAccountViewModel[]>
  >;
}

export const MailingAccountsList = (props: Props) => {
  return (
    <div className="d-flex ">
      {props.mailingAccounts.map((mailingAccount, index) => (
        <MailingAccountItem
          key={index}
          account={mailingAccount}
          mailingAccountsCallback={props.mailingAccountsCallback}
        />
      ))}
    </div>
  );
};
