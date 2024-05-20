import { AuthorizationComponent } from "../components/authorization/authorizationComponent";
import { Container } from "react-bootstrap";
import React from "react";

export const AuthorizationPage = () => {
    return (<Container className='d-flex flex-column align-items-center justify-content-center'>
        <AuthorizationComponent />
    </Container>);
}