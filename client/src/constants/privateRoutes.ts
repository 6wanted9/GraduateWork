import { RouteItem } from "./routeItem";
import { routePaths } from "./routePaths";
import { MailingAccountsPage } from "../pages/MailingAccountsPage";

export const PrivateRoutes: Array<RouteItem> = [
    // { path: routePaths.emailTemplates.path, component: MailingAccountsPage },
    // { path: routePaths.usersGroups.path, component: MailingAccountsPage },
    { path: routePaths.mailingAccounts.path, component: MailingAccountsPage }
]