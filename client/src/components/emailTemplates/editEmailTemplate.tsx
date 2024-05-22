import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { Button, CircularProgress, Typography } from "@mui/material";
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

interface Props {
  emailTemplate?: EmailTemplateViewModel;
}

const ValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
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
        <Form className="container">
          <div className="row">
            <div className="col">
              <Field
                type="text"
                name="subject"
                label="Subject"
                component={TextField}
                className="w-100"
              />
            </div>
            <div className="col">
              <Typography display="block" textAlign="center" variant="overline">
                Preview
              </Typography>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col overflow-auto">
              <Editor
                loading={<CircularProgress />}
                theme="vs-dark"
                onChange={(value, event) => {
                  const newContent = value ?? "";
                  values.content = newContent;
                  setContent(newContent);
                }}
                defaultValue={values.content}
                defaultLanguage="html"
                height="70vh"
              />
            </div>
            <div className="col">
              <iframe className="w-100 h-100" srcDoc={content} />
            </div>
          </div>
          <div className="row my-5">
            <Button
              fullWidth
              variant="outlined"
              size="large"
              type="submit"
              disabled={isSubmitting}
            >
              {"Submit"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
