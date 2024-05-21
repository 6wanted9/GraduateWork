import { RouteItem } from "./routeItem";
import { routePaths } from "./routePaths";
import { MailingAccountsPage } from "../pages/mailingAccountsPage";
import { EmailTemplatesPage } from "../pages/emailTemplates/emailTemplatesPage";
import { AddEmailTemplatePage } from "../pages/emailTemplates/addEmailTemplatePage";
import { EditEmailTemplatePage } from "../pages/emailTemplates/editEmailTemplatePage";

export const PrivateRoutes: Array<RouteItem> = [
    // { path: routePaths.usersGroups.path, component: MailingAccountsPage },
    { path: routePaths.mailingAccounts.path, component: MailingAccountsPage },
    { path: routePaths.emailTemplates.path, component: EmailTemplatesPage },
    { path: routePaths.emailTemplates.add, component: AddEmailTemplatePage },
    { path: routePaths.emailTemplates.edit, component: EditEmailTemplatePage }
]