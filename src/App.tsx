import Menu from "./components/Menu";
import Page from "./pages/Page";
import React, { useEffect } from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import TabRootPage from "./pages/TabRootPage";
import CreateAccountPage from "./pages/auth/CreateAccountPage";
import LoginPage from "./pages/auth/LoginPage";

// Auth
import { useAuth } from "./pages/auth/authContext";

const App: React.FC = () => {
  const { authInfo, initialize } = useAuth()!;

  useEffect(() => {
    !authInfo?.initialized && (async () => await initialize())();
  },[authInfo, initialize]);

  if (!authInfo || !authInfo.initialized) {
    return (
      <IonApp>
        <IonLoading isOpen={true} />
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <>
          {authInfo?.loggedIn === true ? (
            <IonReactRouter>
              <IonSplitPane contentId="main">
                <Menu />
                <IonRouterOutlet id="main">
                  <Switch>
                  <Route path="/page/:name" component={Page} exact />
                  <Route path="/tabs" component={TabRootPage} />
                  <Redirect from="/" to="/tabs" exact />
                  </Switch>
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          ) : (
            <IonReactRouter>
              <Route
                path="/create-account"
                component={CreateAccountPage}
                exact
              />
              <Route path="/login" component={LoginPage} exact />
              <Redirect from="/" to="/login" exact />
            </IonReactRouter>
          )}
        </>
      </IonApp>
    );
  }
};

export default App;
