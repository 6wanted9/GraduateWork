import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import { CreateEmailTemplateRequest } from "../../dataModels/emailTemplates/createEmailTemplateRequest";
import * as Yup from "yup";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../constants/routePaths";
import { Editor } from "@monaco-editor/react";
import { styled } from "@mui/material/styles";
import { ErrorMessages } from "../../constants/errorMessages";

interface Props {
  emailTemplate?: EmailTemplateViewModel;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
    height: "100%",
    borderRadius: "1rem",
  },
}));

const ValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Required"),
  content: Yup.string(),
});

export const EditEmailTemplate = (props: Props) => {
  const navigate = useNavigate();
  const emailTemplate = props.emailTemplate;

  const [content, setContent] = useState<string>(emailTemplate?.content ?? "");

  const onSubmit = async (
    request: CreateEmailTemplateRequest,
    helpers: FormikHelpers<CreateEmailTemplateRequest>,
  ) => {
    try {
      if (!request.content) {
        return toast.error("Email template's content cannot be empty.");
      }

      const editingExistingEntity = !!emailTemplate;
      const method = editingExistingEntity ? Api.patch : Api.post;

      await method(
        apiUrls.emailTemplates.list,
        !editingExistingEntity ? request : { id: emailTemplate.id, ...request },
      );

      toast.success(
        `Successfully ${editingExistingEntity ? "updated" : "created"}.`,
      );

      return navigate(routePaths.emailTemplates.path);
    } catch (e) {
      helpers.setSubmitting(false);
    }
  };

  const initialValues: CreateEmailTemplateRequest = {
    subject: emailTemplate?.subject ?? "",
    content: emailTemplate?.content ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form className="d-flex flex-column rounded-4 h-100">
          <Box className="d-flex flex-row rounded-4" sx={{ height: "90%" }}>
            <Box className="d-flex flex-column rounded-4 h-100 w-50 me-3">
              <Box className="w-100 mb-3 rounded-4" sx={{ height: "10%" }}>
                <Field
                  type="text"
                  name="subject"
                  label="Subject"
                  component={StyledTextField}
                  className="h-100 w-100 rounded-4"
                />
              </Box>
              <Box
                className="overflow-auto rounded-4"
                sx={{
                  height: "calc(90% - 1rem)",
                  backgroundColor: "whitesmoke",
                }}
              >
                <Editor
                  loading={<CircularProgress />}
                  theme="vs-dark"
                  onChange={(value, event) => {
                    const newContent = value ?? "";
                    values.content = newContent;
                    setContent(newContent);
                  }}
                  options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                  }}
                  defaultValue={values.content}
                  defaultLanguage="html"
                  className="rounded-4 position-absolute h-100"
                />
              </Box>
            </Box>
            <Box className="d-flex flex-column h-100 w-50 rounded-4">
              <Box
                className="d-flex flex-row justify-content-center align-items-center mb-3 rounded-4"
                sx={{ height: "10%", backgroundColor: "whitesmoke" }}
              >
                <Typography>Preview</Typography>
              </Box>
              <Box
                className="d-flex flex-column justify-content-center align-items-center overflow-auto rounded-4"
                sx={{
                  height: "calc(90% - 1rem)",
                  backgroundColor: "whitesmoke",
                }}
              >
                {!!content ? (
                  <iframe className="w-100 h-100" srcDoc={content} />
                ) : (
                  <Typography variant="overline">
                    Please, start typing for preview.
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box className="my-3 rounded-4" sx={{ height: "calc(10% - 2rem)" }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              type="submit"
              disabled={isSubmitting}
              className="rounded-4 h-100"
            >
              {"Submit"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
