import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import React from "react";
import { Avatar } from "@mui/material";

interface Props {
  account: MailingAccountViewModel;
}
export const MailingAccountItem = (props: Props) => {
  return (
    <div className="d-flex flex-column align-items-center m-2">
      <Avatar
        className="mb-2"
        sx={{ width: 100, height: 100 }}
        src={props.account.picture}
        alt="FAILED"
        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      />
      <div className="d-flex flex-column align-items-start">
        <span>
          <b>Name:</b> {props.account.name}
        </span>
        <span>
          <b>Email:</b> {props.account.email}
        </span>
      </div>
    </div>
  );
};
