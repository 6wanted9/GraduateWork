import { SendEmailProps } from "./sendEmailProps";
import React from "react";

export type SendEmailStepField =
  | "emailTemplate"
  | "mailingAccount"
  | "recipientGroup";

export interface SendEmailStep {
  field: SendEmailStepField;
  label: string;
  component: (props: SendEmailProps) => React.JSX.Element;
}
