
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import React from "react";
  
  const CreateAccountPage: React.FC = () => {

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Create Account Page {}</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent></IonContent>
      </IonPage>
    );
  };
  
  export default CreateAccountPage;
  