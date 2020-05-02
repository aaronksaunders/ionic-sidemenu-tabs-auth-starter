import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonLoading,
  IonItem,
  IonBackButton,
  IonAlert,
  IonButton,
  IonIcon,
  IonModal,
  IonTextarea,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";

import { useQuery, useMutation, queryCache } from "react-query";
import { useParams } from "react-router";
import { addCircleOutline } from "ionicons/icons";

const BASE_URL = "http://localhost:3000"

const CommentPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const [modalOpen, setModalOpen] = useState(false);

  // call using queryKey and passing in the parameters
  const { status, data, error } = useQuery(["comments", postId], async () => {
    return new Promise(async (resolve) => {
      let r = await fetch(`${BASE_URL}/posts/${postId}/comments`);
      let data = await r.json();
      setTimeout(() => resolve(data), 1000);
    });
  });

  // call using queryKey and passing in the parameters
  const [mutateAddComment] = useMutation(
    async ({ commentBody, postId }: any) => {
      return await fetch(`${BASE_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: commentBody, postId }),
      });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries("comments");
      },
    }
  );

  const [mutateDeleteComment] = useMutation(
    async ({ commentId }: any) => {
      return await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries("comments");
      },
    }
  );

  const deleteComment = async (id:string) => {
    let resp = await mutateDeleteComment({commentId:id});
    console.log(resp);
  }
  const onModalClose = async ({
    commentBody,
    cancel,
  }: {
    commentBody: string;
    cancel: boolean;
  }) => {
    if (cancel) return;

    debugger;
    setModalOpen(false);

    const data = await mutateAddComment({ commentBody, postId });
    console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Comments For: {postId}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setModalOpen(true)}>
              <IonIcon icon={addCircleOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonLoading message={"Loading..."} isOpen={status === "loading"} />
      {error !== null && (
        <IonAlert message={(error as any).message} isOpen={error !== null} />
      )}

      <IonContent>
        {/* ION MODAL */}
        <IonModal isOpen={modalOpen}>
          <CommentModal onClose={onModalClose} />
        </IonModal>
        {data
          ? (data as Array<any>).map((d) => {
              return (
                <CommentItem
                  key={d.id}
                  data={d}
                  handleClick={deleteComment}
                />
              );
            })
          : null}
      </IonContent>
    </IonPage>
  );
};

const CommentItem = ({ data, handleClick }: any) => {
  return <IonItem onClick={()=>handleClick(data.id)}>{data.body} </IonItem>;
};

const CommentModal = ({ onClose }: { onClose: any }) => {
  const [commentBody, setCommentBody] = useState("");
  return (
    <IonContent>
      <p>This is Modal Content</p>
      <IonItem>
        <IonLabel position="stacked">Comment</IonLabel>
        <IonTextarea
          onIonChange={(e) => setCommentBody(e.detail.value as any)}
        ></IonTextarea>
      </IonItem>
      <IonButton onClick={() => onClose({ commentBody })}>Close</IonButton>
      <IonButton onClick={() => onClose({ cancel: true })}>Cancel</IonButton>
    </IonContent>
  );
};

export default CommentPage;
