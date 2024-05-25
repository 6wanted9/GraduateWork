import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routePaths } from "./constants/routePaths";
import { AuthorizationPage } from "./pages/authorizationPage";
import "./App.css";
import { PrivateRoute } from "./components/layout/privateRoute";
import { PrivateRoutes } from "./constants/privateRoutes";
import { AuthSession } from "./utils/AuthSession";
import { NavigationBar } from "./components/layout/navigationBar";

AuthSession.updateHeader();

const App = () => {
  const defaultAuthorizedPath = routePaths.emailTemplates.path;
  const defaultUnauthorizedPath = routePaths.authorization;

  return (
    <div className="App">
      <Router>
        <NavigationBar>
          <Routes>
            <Route
              path={routePaths.authorization}
              element={
                !AuthSession.isTokenSet() ? (
                  <AuthorizationPage />
                ) : (
                  <Navigate replace to={defaultAuthorizedPath} />
                )
              }
            />
            {/*<Route path={routes.usersGroups.path}  Component={UsersGroupsPage}/>*/}
            {PrivateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={PrivateRoute({ component: route.component })}
              />
            ))}
            <Route
              path={routePaths.home}
              element={
                <Navigate
                  replace
                  to={
                    AuthSession.isTokenSet()
                      ? defaultAuthorizedPath
                      : defaultUnauthorizedPath
                  }
                />
              }
            />
            <Route
              path="*"
              element={<Navigate replace to={routePaths.notFound} />}
            />
          </Routes>
        </NavigationBar>
      </Router>
    </div>
  );
};

export default App;
