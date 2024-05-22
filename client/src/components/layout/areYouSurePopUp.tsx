import React from "react";
import { IconButton, Popover, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

interface Props {
  action: () => Promise<void>;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  anchor: Element | null;
}
export const AreYouSurePopUp = (props: Props) => {
  const closePopUp = () => {
    props.setIsOpened(false);
  };

  return (
    <Popover
      anchorEl={props.anchor}
      open={props.isOpened}
      onClose={closePopUp}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <div className="p-2">
        <Typography>Are you sure?</Typography>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <IconButton
            size="small"
            onClick={async () => {
              await props.action();
              closePopUp();
            }}
          >
            <Check />
          </IconButton>
          <IconButton size="small" onClick={closePopUp}>
            <Close />
          </IconButton>
        </div>
      </div>
    </Popover>
  );
};
