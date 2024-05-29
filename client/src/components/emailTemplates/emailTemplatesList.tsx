import React from "react";
import { useEffect, useState } from "react";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { EmailTemplateItem } from "./emailTemplateItem";
import List from "@mui/material/List";
import { ErrorMessages } from "../../constants/errorMessages";

export const EmailTemplatesList = () => {
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
      toast.error(ErrorMessages.DefaultError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmailTemplates();
  }, []);

  useEffect(() => {
    if (emailTemplates.find((t) => t === selectedTemplate) === undefined) {
      setSelectedTemplate(undefined);
    }
  }, [emailTemplates]);

  return isLoading ? (
    <div className="d-flex flex-column justify-content-center align-items-center rounded-4">
      <CircularProgress />
    </div>
  ) : (
    <div className="d-flex flex-row rounded-4 h-100">
      <List
        component="nav"
        className="h-100 w-25 overflow-auto me-3 rounded-4"
        sx={{ backgroundColor: "whitesmoke" }}
      >
        {emailTemplates.map((emailTemplate, index) => (
          <EmailTemplateItem
            key={index}
            template={emailTemplate}
            emailTemplatesListCallback={setEmailTemplates}
            selectedTemplate={selectedTemplate}
            selectTemplateCallback={setSelectedTemplate}
          />
        ))}
      </List>
      <div className="w-100 rounded-4">
        <Box
          className="d-flex flex-row justify-content-center align-items-center mb-3 rounded-4"
          sx={{
            height: "10%",
            backgroundColor: "whitesmoke",
          }}
        >
          <Typography>PREVIEW</Typography>
        </Box>
        <Box
          className="overflow-auto rounded-4"
          sx={{ height: "calc(90% - 1rem)" }}
        >
          <Box
            className="h-100 d-flex justify-content-center align-items-center rounded-4"
            sx={{ backgroundColor: "whitesmoke" }}
          >
            {selectedTemplate !== undefined ? (
              <iframe
                className="w-100 h-100"
                srcDoc={selectedTemplate.content}
              />
            ) : (
              <Typography variant="overline">
                Please, select a template for preview.
              </Typography>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};
