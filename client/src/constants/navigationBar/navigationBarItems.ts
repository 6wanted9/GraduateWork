import { NavigationBarItem } from "./navigationBarItem";
import { routePaths } from "../routePaths";
import {
  AutoAwesomeMosaic,
  Groups,
  ManageAccounts,
  Send,
} from "@mui/icons-material";

export const NavigationBarItems: Array<NavigationBarItem> = [
  {
    name: "Mailing Accounts",
    path: routePaths.mailingAccounts.path,
    icon: ManageAccounts,
  },
  {
    name: "Email Templates",
    path: routePaths.emailTemplates.path,
    icon: AutoAwesomeMosaic,
  },
  {
    name: "Users Groups",
    path: routePaths.usersGroups.path,
    icon: Groups,
  },
  {
    name: "Send Emails",
    path: routePaths.usersGroups.path,
    icon: Send,
  },
];
