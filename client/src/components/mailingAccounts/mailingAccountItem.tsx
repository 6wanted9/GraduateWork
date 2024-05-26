import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import React, { Dispatch } from "react";
import { Avatar, Badge } from "@mui/material";
import { apiUrls } from "../../constants/api";
import { Logout } from "@mui/icons-material";
import { DeleteButton } from "../layout/buttons/deleteButton";
import { styled } from "@mui/material/styles";

interface Props {
  account: MailingAccountViewModel;
  mailingAccountsCallback?: Dispatch<
    React.SetStateAction<MailingAccountViewModel[]>
  >;
  onClick?: (value: MailingAccountViewModel) => Promise<void>;
}

const StyledLogoutIcon = styled(Logout)(({ theme }) => ({
  border: "1px solid gray",
  color: "gray",
  borderRadius: "100%",
  backgroundColor: "white",
  padding: "5px",
}));

export const MailingAccountItem = (props: Props) => {
  const getDeleteButton = () => {
    if (!props.mailingAccountsCallback) {
      return;
    }

    return (
      <DeleteButton
        entityId={props.account.id}
        endpoint={apiUrls.mailingAccounts.item}
        entitiesListCallback={props.mailingAccountsCallback}
        customIcon={<StyledLogoutIcon />}
      />
    );
  };

  return (
    <div
      onClick={() => props.onClick?.(props.account)}
      className="d-flex flex-column align-items-center m-2"
    >
      <Badge overlap="circular" badgeContent={getDeleteButton()}>
        <Avatar
          className="mb-2"
          sx={{ width: 100, height: 100 }}
          src={props.account.picture}
          alt="FAILED"
          slotProps={{ img: { referrerPolicy: "no-referrer" } }}
        />
      </Badge>
      <div className="d-flex flex-column align-items-start">
        <span>
          <b>Name:</b> {props.account.name}
        </span>
        <span>
          <b>Email:</b> {props.account.email}
        </span>
      </div>
    </div>
  );
};
