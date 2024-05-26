import { SendEmailProps } from "../../constants/sendEmail/sendEmailProps";
import React, { useEffect, useState } from "react";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import { EmailTemplateItem } from "../emailTemplates/emailTemplateItem";

export const ChooseEmailTemplateStep = (props: SendEmailProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplateViewModel>();

  const [emailTemplates, setEmailTemplates] = useState<
    Array<EmailTemplateViewModel>
  >([]);

  const getEmailTemplates = async () => {
    try {
      const templates: Array<EmailTemplateViewModel> = await Api.get(
        apiUrls.emailTemplates.list,
      );

      setEmailTemplates(templates);
    } catch (e) {
      toast.error("Error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmailTemplates();
  }, [props]);

  useEffect(() => {
    props.setValue("emailTemplate", selectedTemplate);
  }, [selectedTemplate]);

  return isLoading ? (
    <div className="d-flex flex-column justify-content-center align-items-center rounded-4">
      <CircularProgress />
    </div>
  ) : (
    <List
      component="nav"
      className="h-100 w-100 overflow-auto me-3 rounded-4"
      sx={{ backgroundColor: "whitesmoke" }}
    >
      {emailTemplates.map((emailTemplate, index) => (
        <EmailTemplateItem
          key={index}
          template={emailTemplate}
          selectedTemplate={selectedTemplate}
          selectTemplateCallback={setSelectedTemplate}
        />
      ))}
    </List>
  );
};
