import React from "react";
import { Typography } from "@mui/material";
import { RecipientGroupsList } from "../components/recipientGroups/recipientGroupsList";

export const RecipientGroupsPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        RECIPIENT GROUPS
      </Typography>
      <RecipientGroupsList />
    </>
  );
};
