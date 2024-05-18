import React from 'react';
import './App.css';
import { AddMailingAccountComponent } from "./components/mailingAccounts/addMailingAccountComponent";
import { LoginComponent } from "./components/authorization/loginComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (<>
        <LoginComponent />
        <AddMailingAccountComponent />
        <ToastContainer />
    </>);
}

export default App;
