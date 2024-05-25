import SvgIcon from "@mui/material/SvgIcon/SvgIcon";

export interface NavigationBarItem {
  name: string;
  path: string;
  icon: typeof SvgIcon;
}
