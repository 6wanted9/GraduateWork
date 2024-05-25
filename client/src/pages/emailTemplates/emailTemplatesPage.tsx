import React from "react";
import { EmailTemplatesList } from "../../components/emailTemplates/emailTemplatesList";
import { Box, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { routePaths } from "../../constants/routePaths";
import { useNavigate } from "react-router-dom";

export const EmailTemplatesPage = () => {
  const navigate = useNavigate();

  const useRedirect = () => {
    return navigate(routePaths.emailTemplates.add);
  };

  return (
    <>
      <Box className="d-flex flex-row justify-content-between align-items-center">
        <Typography variant="h4" gutterBottom>
          EMAIL TEMPLATES
        </Typography>
        <IconButton size="large" onClick={useRedirect}>
          <Add />
        </IconButton>
      </Box>
      <EmailTemplatesList />
    </>
  );
};
