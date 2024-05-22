import React, { useState } from "react";
import { AuthorizationTypeResolver } from "./authorizationTypeResolver";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import { AuthSession } from "../../utils/AuthSession";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AuthRequestModel } from "../../dataModels/authRequestModel";
import { toast } from "react-toastify";
import { TextField } from "formik-mui";
import { Button } from "@mui/material";
import * as Yup from 'yup';
import { AuthResponseModel } from "../../dataModels/authResponseModel";

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

export const AuthorizationComponent = () => {
    const [isLogin, setIsLogin] = useState(true);

    const onSubmit = async (request: AuthRequestModel, helpers: FormikHelpers<AuthRequestModel>) => {
        try {
            const endpoint = isLogin ? apiUrls.authorization.login : apiUrls.authorization.register;
            const token: AuthResponseModel = await Api.post(endpoint, request);
            AuthSession.login(token.accessToken);
            toast.success("Successfully logged in.");
        } catch (e) {
            toast.error("Error occurred.");
            helpers.setSubmitting(false);
        }
    }

    const initialValues: AuthRequestModel = { email: '', password: '' };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className='d-flex flex-column justify-content-center align-items-center'>
                    <AuthorizationTypeResolver isLogin={isLogin} setIsLogin={setIsLogin} />
                    <Field  type="email" name="email" label="Email" component={TextField} className="m-2" />
                    <Field  type="password" name="password" label="Password" component={TextField} className="m-2" />
                    <Button className='w-100' color="primary" type="submit" disabled={isSubmitting}>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}