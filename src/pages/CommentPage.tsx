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
  IonBackButton,
  IonAlert,
} from "@ionic/react";
import React  from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router";

const CommentPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  console.log("render Comment Page " + postId);

  // call using queryKey and passing in the parameters
  const { status, data, error } = useQuery(["comments", postId], async () => {
    return new Promise(async (resolve) => {
      let r = await fetch(`http://localhost:3000/posts/${postId}/comments`);
      let data = await r.json();
      setTimeout(() => resolve(data), 1000);
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Comments For: {postId}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message={"Loading..."} isOpen={status === "loading"} />
      {error !== null && (
        <IonAlert message={(error as any).message} isOpen={error !== null} />
      )}
      <IonContent>
        {data
          ? (data as Array<any>).map((d) => {
              return <CommentItem key={d.id} data={d} />;
            })
          : null}
      </IonContent>
    </IonPage>
  );
};

const CommentItem = ({ data }: any) => {
  return <IonItem>{data.body} </IonItem>;
};

export default CommentPage;
