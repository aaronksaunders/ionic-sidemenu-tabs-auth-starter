import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonLoading,
  IonItem,
} from "@ionic/react";
import React from "react";

import { useQuery } from "react-query";
import { useHistory } from "react-router";

interface PageProps {
  pageName: string | undefined;
}

const AccountTabPage: React.FC<PageProps> = ({ pageName }) => {
  console.log("render TabPage " + pageName);

  const history = useHistory();
  const { status, data, error } = useQuery("todos", async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let r = await fetch("http://localhost:3000/posts");
        let data = await r.json();
        setTimeout(() => resolve(data), 1000);
      } catch (e) {
        alert("Error: Make Sure You Started the Server " + e.message);
      }
    });
  });
  console.log("status", status);
  console.log("data", data);
  console.log("error", error);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{pageName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message={"Loading..."} isOpen={status === "loading"} />
      <IonContent>
        {data
          ? (data as Array<any>)?.map((d) => {
              return (
                <AccountItem
                  key={d.id}
                  data={d}
                  handleClick={() =>
                    history.push(`/tabs/account-posts/${d.id}`)
                  }
                />
              );
            })
          : null}
      </IonContent>
    </IonPage>
  );
};

const AccountItem = ({
  data,
  handleClick,
}: {
  data: any;
  handleClick: any;
}) => {
  return <IonItem onClick={handleClick}>{data.title}</IonItem>;
};

export default React.memo(AccountTabPage);
