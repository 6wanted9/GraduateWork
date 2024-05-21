import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { Button } from "@mui/material";
import React from "react";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import { CreateEmailTemplateRequest } from "../../dataModels/emailTemplates/createEmailTemplateRequest";
import * as Yup from "yup";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../constants/routePaths";
import parse from "html-react-parser";

interface Props {
    emailTemplate?: EmailTemplateViewModel
}

const ValidationSchema = Yup.object().shape({
    subject: Yup.string().required('Required'),
    content: Yup.string().required('Required')
});

export const EditEmailTemplate = (props: Props) => {
    const navigate = useNavigate();
    const emailTemplate = props.emailTemplate;

    const onSubmit = async (request: CreateEmailTemplateRequest, helpers: FormikHelpers<CreateEmailTemplateRequest>) => {
        try {
            const editingExistingEntity = !!emailTemplate;
            const method = editingExistingEntity ? Api.patch : Api.post;

            await method(apiUrls.emailTemplates.list, !editingExistingEntity ? request : { id: emailTemplate.id, ...request });

            toast.success(`Successfully ${editingExistingEntity ? 'updated' : 'created'}.`);

            return navigate(routePaths.emailTemplates.path);
        } catch (e) {
            helpers.setSubmitting(false);
        }
    }

    const initialValues: CreateEmailTemplateRequest = {
        subject: emailTemplate?.subject ?? '',
        content: emailTemplate?.content ?? ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, values }) => (<div className='d-flex flex-row justify-content-evenly'>
                <Form className='d-flex flex-column justify-content-center align-items-center'>
                    <Field  type='text' name="subject" label="Subject" component={TextField} className="m-2" />
                    <Field  type="text" name="content" label="Content" component={TextField} className="m-2" />
                    <Button className='w-100' color="primary" type="submit" disabled={isSubmitting}>
                        {'Submit'}
                    </Button>
                </Form>
                <div>{parse(values.content)}</div>
            </div>)}
        </Formik>
    );
}