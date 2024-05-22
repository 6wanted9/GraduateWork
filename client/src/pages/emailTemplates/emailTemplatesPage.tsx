import React from "react";
import { EmailTemplatesList } from "../../components/emailTemplates/emailTemplatesList";
import { Typography } from "@mui/material";

export const EmailTemplatesPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        EMAIL TEMPLATES
      </Typography>
      <EmailTemplatesList />
    </>
  );
};
