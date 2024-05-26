import { SendEmailStep } from "./sendEmailStep";
import { ChooseMailingAccountStep } from "../../components/sendEmail/chooseMailingAccountStep";

export const SendEmailSteps: Array<SendEmailStep> = [
  {
    label: "Choose Mailing Account",
    component: ChooseMailingAccountStep,
  },
  {
    label: "Choose Email Template",
    component: ChooseMailingAccountStep,
  },
  {
    label: "Choose Recipients Group",
    component: ChooseMailingAccountStep,
  },
];
