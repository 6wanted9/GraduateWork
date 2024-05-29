import { Chip } from "@mui/material";
import React from "react";

interface Props {
  recipients: Array<string>;
}

export const RecipientsView = (props: Props) => {
  return (
    <>
      {props.recipients.map((recipient, index) => (
        <Chip className="m-1" key={index} label={recipient} />
      ))}
    </>
  );
};
