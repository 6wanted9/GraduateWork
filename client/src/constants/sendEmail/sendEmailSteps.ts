import { SendEmailStep } from "./sendEmailStep";
import { ChooseMailingAccountStep } from "../../components/sendEmail/chooseMailingAccountStep";
import { ChooseEmailTemplateStep } from "../../components/sendEmail/chooseEmailTemplateStep";
import { ChooseRecipientGroupStep } from "../../components/sendEmail/chooseRecipientGroupStep";

export const SendEmailSteps: Array<SendEmailStep> = [
  {
    field: "emailTemplate",
    label: "Choose Email Template",
    component: ChooseEmailTemplateStep,
  },
  {
    field: "mailingAccount",
    label: "Choose Mailing Account",
    component: ChooseMailingAccountStep,
  },
  {
    field: "recipientGroup",
    label: "Choose Recipients Group",
    component: ChooseRecipientGroupStep,
  },
];
