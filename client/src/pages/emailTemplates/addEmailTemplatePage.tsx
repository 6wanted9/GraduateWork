import { EditEmailTemplate } from "../../components/emailTemplates/editEmailTemplate";
import React from "react";
import { Typography } from "@mui/material";

export const AddEmailTemplatePage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        EMAIL TEMPLATES / ADD
      </Typography>
      <EditEmailTemplate />
    </>
  );
};
