import { EditEmailTemplate } from "../../components/emailTemplates/editEmailTemplate";
import { useParams } from "react-router-dom";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import React, { useEffect, useState } from "react";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { toast } from "react-toastify";
import { CircularProgress, Typography } from "@mui/material";

export const EditEmailTemplatePage = () => {
  const { emailTemplateId } = useParams<{ emailTemplateId: string }>();
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplateViewModel>();

  const getEmailTemplate = async () => {
    if (emailTemplateId) {
      try {
        const emailTemplate: EmailTemplateViewModel = await Api.get(
          apiUrls.emailTemplates.item(emailTemplateId),
        );
        setEmailTemplate(emailTemplate);
      } catch (e) {
        toast.error("Error occurred");
      }
    }
  };

  useEffect(() => {
    getEmailTemplate();
  }, [emailTemplateId]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        EMAIL TEMPLATES / EDIT
      </Typography>
      {emailTemplate ? (
        <EditEmailTemplate emailTemplate={emailTemplate} />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
