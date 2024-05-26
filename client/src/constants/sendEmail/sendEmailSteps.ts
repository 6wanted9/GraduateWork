import { SendEmailStep } from "./sendEmailStep";
import { ChooseMailingAccountStep } from "../../components/sendEmail/chooseMailingAccountStep";
import { ChooseEmailTemplateStep } from "../../components/sendEmail/chooseEmailTemplateStep";

export const SendEmailSteps: Array<SendEmailStep> = [
  {
    label: "Choose Mailing Account",
    component: ChooseMailingAccountStep,
  },
  {
    label: "Choose Email Template",
    component: ChooseEmailTemplateStep,
  },
  {
    label: "Choose Recipients Group",
    component: ChooseMailingAccountStep,
  },
];
