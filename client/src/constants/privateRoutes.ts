import { RouteItem } from "./routeItem";
import { routePaths } from "./routePaths";
import { MailingAccountsPage } from "../pages/mailingAccountsPage";
import { EmailTemplatesPage } from "../pages/emailTemplatesPage";

export const PrivateRoutes: Array<RouteItem> = [
    // { path: routePaths.usersGroups.path, component: MailingAccountsPage },
    { path: routePaths.mailingAccounts.path, component: MailingAccountsPage },
    { path: routePaths.emailTemplates.path, component: EmailTemplatesPage }
]