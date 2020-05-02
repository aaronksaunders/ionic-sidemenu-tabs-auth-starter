import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import React from "react";
// Auth
import { RouteComponentProps } from "react-router";
import { useAuth } from "./authContext";

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  let { logIn } = useAuth()!;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login Page {""}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonButton
          onClick={async () => {
            await logIn();
            history.replace("/tabs/account");
          }}
        >
          LOGIN
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
