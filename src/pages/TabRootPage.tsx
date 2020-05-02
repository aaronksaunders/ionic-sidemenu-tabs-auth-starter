import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import "./TabRootPage.css";
import { person, call } from "ionicons/icons";
import TabPage from "./TabPage";
import AccountTabPage from "./AccountTabPage";
import CommentPage from "./CommentPage";

const TabRootPage: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/account" />
        <Route
          path="/tabs/account"
          render={() => <AccountTabPage pageName="Account" />}
          exact={true}
        />
        <Route
          path="/tabs/account-posts/:postId"
          component={CommentPage}
          exact={true}
        />
        <Route
          path="/tabs/contact"
          render={(props) => <TabPage pageName="Contact" {...props} />}
          exact={true}
        />
      </IonRouterOutlet>
      {/*-- Tab bar --*/}
      <IonTabBar slot="bottom">
        <IonTabButton tab="account" href="/tabs/account">
          <IonIcon icon={person} />
        </IonTabButton>
        <IonTabButton tab="contact" href="/tabs/contact">
          <IonIcon icon={call} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabRootPage;
