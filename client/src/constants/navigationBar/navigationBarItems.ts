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
    path: routePaths.recipientGroups.path,
    icon: Groups,
  },
  {
    name: "Send Email",
    path: routePaths.sendEmail,
    icon: Send,
  },
];
