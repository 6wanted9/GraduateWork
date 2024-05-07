import React from 'react';
import './App.css';
import { AddMailingAccountComponent } from "./components/mailingAccounts/addMailingAccountComponent";
import { LoginComponent } from "./components/authorization/loginComponent";

const App = () => {
    return (<>
        <LoginComponent />
        <AddMailingAccountComponent />
    </>);
}

export default App;
