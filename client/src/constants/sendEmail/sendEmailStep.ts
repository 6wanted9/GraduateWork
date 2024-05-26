import { SendEmailProps } from "./sendEmailProps";
import React from "react";

export interface SendEmailStep {
  label: string;
  component: (props: SendEmailProps) => React.JSX.Element;
}
