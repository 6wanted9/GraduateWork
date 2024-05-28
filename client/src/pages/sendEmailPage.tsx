import { Form, Formik, FormikHelpers } from "formik";
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import Api from "../utils/Api";
import { apiUrls } from "../constants/api";
import { routePaths } from "../constants/routePaths";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SendEmailSteps } from "../constants/sendEmail/sendEmailSteps";
import { SendEmailStep } from "../constants/sendEmail/sendEmailStep";
import { MailingAccountViewModel } from "../dataModels/mailingAccounts/mailingAccountViewModel";
import { EmailTemplateViewModel } from "../dataModels/emailTemplates/emailTemplateViewModel";
import { RecipientGroupViewModel } from "../dataModels/recipientGroups/recipientGroupViewModel";

interface SendEmailModel {
  mailingAccount?: MailingAccountViewModel;
  emailTemplate?: EmailTemplateViewModel;
  recipientGroup?: RecipientGroupViewModel;
}

const baseClass = "d-flex justify-content-center align-items-center rounded-4";

const getComponentWithBadge = (
  badgeContent: string,
  children: ReactNode,
  useMargin: boolean = false,
) => {
  return (
    <Badge
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      badgeContent={
        <Typography
          className="bg-white mb-3 rounded-5 p-1"
          variant="overline"
          fontSize={8}
        >
          {badgeContent}
        </Typography>
      }
      overlap="circular"
      className={`${baseClass} ${useMargin ? "me-3" : ""} h-100`}
      sx={{ backgroundColor: "whitesmoke", width: "calc(50% - 0.5rem)" }}
    >
      {children}
    </Badge>
  );
};

const getValueSetter = (helpers: FormikHelpers<SendEmailModel>) => {
  return async (field: string, value: any) => {
    await helpers.setFieldValue(field, value, true);
  };
};

const ValidationSchema = Yup.object().shape({
  mailingAccount: Yup.object<MailingAccountViewModel>().required("Required"),
  emailTemplate: Yup.object<EmailTemplateViewModel>().required("Required"),
  recipientGroup: Yup.object<RecipientGroupViewModel>().required("Required"),
});

export const SendEmailPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [currentComponent, setCurrentComponent] =
    React.useState<SendEmailStep>();

  const MapStepToField = (step: number) => {
    return SendEmailSteps[step].field;
  };

  const isNextStepAvailable = (model: SendEmailModel) => {
    const targetItem = model[MapStepToField(currentStep)];

    return !!targetItem;
  };

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStep((current) => current + 1);
    }
  };

  const handlePreviousStep = (model: SendEmailModel) => {
    const current = currentStep;
    const previous = current - 1;
    model[MapStepToField(current)] = undefined;
    model[MapStepToField(previous)] = undefined;

    setCurrentStep(previous);
  };

  const initialValues: SendEmailModel = {
    mailingAccount: undefined,
    emailTemplate: undefined,
    recipientGroup: undefined,
  };

  const onSubmit = async (
    request: SendEmailModel,
    helpers: FormikHelpers<SendEmailModel>,
  ) => {
    try {
      const mailingAccountId = request.mailingAccount?.id;
      const emailTemplateId = request.emailTemplate?.id;
      const recipientGroupId = request.recipientGroup?.id;
      if (!mailingAccountId || !emailTemplateId || !recipientGroupId) {
        return toast.error("Not all data filled.");
      }

      await Api.post(apiUrls.emailManagement.send, {
        mailingAccountId,
        emailTemplateId,
        recipientGroupId,
      });

      toast.success(`Email was successfully sent.`);

      return navigate(routePaths.emailTemplates.path);
    } catch (e) {
      helpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    setCurrentComponent(SendEmailSteps[currentStep]);
    setIsLastStep(currentStep === SendEmailSteps.length - 1);
  }, [currentStep]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      {(helpers) => (
        <Form className="d-flex flex-column rounded-4 h-100">
          <Box className="d-flex flex-row rounded-4 h-100">
            <Box className="d-flex flex-column rounded-4 h-100 w-50 me-3">
              <Box
                className={`${baseClass} flex-column w-100 mb-3`}
                sx={{ height: "10%" }}
              >
                <Stepper activeStep={currentStep}>
                  {SendEmailSteps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel>
                        <Typography fontSize={10} variant="overline">
                          {step.label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Box
                className={`${baseClass} flex-column overflow-auto`}
                sx={{
                  height: "calc(90% - 1rem)",
                  backgroundColor: "whitesmoke",
                }}
              >
                {!!currentComponent ? (
                  <currentComponent.component
                    setValue={getValueSetter(helpers)}
                  />
                ) : (
                  <CircularProgress />
                )}
              </Box>
            </Box>
            <Box className="d-flex flex-column h-100 w-50 rounded-4">
              <Box
                className={`${baseClass} flex-row mb-3`}
                sx={{ height: "10%" }}
              >
                {getComponentWithBadge(
                  "Sender",
                  <Typography variant="overline">
                    {!!helpers.values.mailingAccount?.email
                      ? helpers.values.mailingAccount.email
                      : "Complete first step to see..."}
                  </Typography>,
                  true,
                )}
                {getComponentWithBadge(
                  "Recipients",
                  !!helpers.values.recipientGroup?.recipients ? (
                    <Box
                      className={`d-flex align-items-center flex-row h-100 w-100 overflow-scroll`}
                    >
                      {helpers.values.recipientGroup.recipients.map(
                        (recipient, index) => (
                          <Chip className="m-1" key={index} label={recipient} />
                        ),
                      )}
                    </Box>
                  ) : (
                    <Typography variant="overline">
                      Complete last step to see...
                    </Typography>
                  ),
                )}
              </Box>
              <Box
                className={`${baseClass} flex-column overflow-auto`}
                sx={{
                  height: "calc(90% - 1rem)",
                  backgroundColor: "whitesmoke",
                }}
              >
                {!!helpers.values.emailTemplate?.content ? (
                  <iframe
                    className="w-100 h-100"
                    srcDoc={helpers.values.emailTemplate.content}
                  />
                ) : (
                  <Typography variant="overline">
                    Here will be displayed email's content.
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            className={`${baseClass} flex-row my-3 rounded-4`}
            sx={{ height: "calc(10% - 2rem)" }}
          >
            <Button
              onClick={() => handlePreviousStep(helpers.values)}
              fullWidth
              variant="outlined"
              size="large"
              className="rounded-4 h-100 me-3"
              disabled={currentStep === 0 || helpers.isSubmitting}
            >
              {"Previous Step"}
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={
                helpers.isSubmitting || !isNextStepAvailable(helpers.values)
              }
              fullWidth
              variant="outlined"
              size="large"
              type={isLastStep ? "submit" : "button"}
              className="rounded-4 h-100"
            >
              {isLastStep ? "Submit" : "Next Step"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
