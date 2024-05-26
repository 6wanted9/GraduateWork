import React, { Dispatch } from "react";
import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import { MailingAccountItem } from "./mailingAccountItem";

interface EditActions {
  mailingAccountsCallback: Dispatch<
    React.SetStateAction<MailingAccountViewModel[]>
  >;
}

interface Props {
  mailingAccounts: Array<MailingAccountViewModel>;
  editActions?: EditActions;
  onClick?: (value: MailingAccountViewModel) => Promise<void>;
}

export const MailingAccountsList = (props: Props) => {
  return (
    <div className="d-flex">
      {props.mailingAccounts.map((mailingAccount, index) => (
        <MailingAccountItem
          key={index}
          account={mailingAccount}
          mailingAccountsCallback={props.editActions?.mailingAccountsCallback}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};
