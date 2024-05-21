import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routePaths } from "./constants/routePaths";
import { AuthorizationPage } from "./pages/authorizationPage";
import './App.css';
import { PrivateRoute } from "./components/layout/privateRoute";
import { PrivateRoutes } from "./constants/privateRoutes";
import { AuthSession } from "./utils/AuthSession";

AuthSession.updateHeader();

const App = () => {
    return (<div className='App'>
        <Router>
            <Routes>
                <Route path={routePaths.authorization} element={!AuthSession.isTokenSet()
                    ? <AuthorizationPage />
                    : <Navigate replace to={routePaths.mailingAccounts.path} />}/>
                {/*<Route path={routes.emailTemplates.path} Component={EmailTemplatesPage}/>*/}
                {/*<Route path={routes.usersGroups.path}  Component={UsersGroupsPage}/>*/}
                {PrivateRoutes.map((route, index) => <Route
                    key={index}
                    path={route.path}
                    element={PrivateRoute({ component: route.component })} />)}
                <Route path={routePaths.home} element={<Navigate replace to={AuthSession.isTokenSet() ? routePaths.mailingAccounts.path : routePaths.authorization} />} />
                <Route path="*" element={<Navigate replace to={routePaths.notFound} />} />
            </Routes>
            {/*<LoginComponent/>*/}
            {/*<AddMailingAccountComponent/>*/}
        </Router>
    </div>);
}

export default App;
