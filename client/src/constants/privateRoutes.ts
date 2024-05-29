import { RouteItem } from "./routeItem";
import { routePaths } from "./routePaths";
import { MailingAccountsPage } from "../pages/mailingAccountsPage";
import { EmailTemplatesPage } from "../pages/emailTemplates/emailTemplatesPage";
import { AddEmailTemplatePage } from "../pages/emailTemplates/addEmailTemplatePage";
import { EditEmailTemplatePage } from "../pages/emailTemplates/editEmailTemplatePage";
import { SendEmailPage } from "../pages/sendEmailPage";
import { RecipientGroupsPage } from "../pages/recipientGroupsPage";

export const PrivateRoutes: Array<RouteItem> = [
  { path: routePaths.mailingAccounts.path, component: MailingAccountsPage },
  { path: routePaths.emailTemplates.path, component: EmailTemplatesPage },
  { path: routePaths.emailTemplates.add, component: AddEmailTemplatePage },
  { path: routePaths.emailTemplates.edit, component: EditEmailTemplatePage },
  { path: routePaths.recipientGroups.path, component: RecipientGroupsPage },
  { path: routePaths.sendEmail, component: SendEmailPage },
];
