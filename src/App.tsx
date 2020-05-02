import Menu from "./components/Menu";
import Page from "./pages/Page";
import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

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
  const { authInfo } = useAuth()!;

  return (
    <IonApp>
      <>
        {authInfo?.loggedIn === true ? (
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/page/:name" component={Page} exact />
                <Route path="/tabs" component={TabRootPage} />
                <Redirect from="/" to="/tabs" exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        ) : (
          <IonReactRouter>
            <Route path="/create-account" component={CreateAccountPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Redirect from="/" to="/login" exact />
          </IonReactRouter>
        )}
      </>
    </IonApp>
  );
};

export default App;
