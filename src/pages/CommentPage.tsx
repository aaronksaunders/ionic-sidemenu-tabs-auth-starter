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
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";

import { useQuery, useMutation, queryCache } from "react-query";
import { useParams } from "react-router";
import { addCircleOutline } from "ionicons/icons";

import * as API from "../helpers/api";

const CommentPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // call using queryKey and passing in the parameters
  const { status, data, error } = useQuery(
    ["comments", postId],
    API.getAllComments
  );

  // call using queryKey and passing in the parameters
  const [mutateAddComment] = useMutation(API.addComment, {
    onSuccess: () => {
      queryCache.refetchQueries("comments");
    },
  });

  //
  const [mutateDeleteComment] = useMutation(API.deleteComment, {
    onSuccess: () => {
      queryCache.refetchQueries("comments");
    },
  });

  /**
   *
   * @param id
   */
  const deleteComment = async (id: string) => {
    let resp = await mutateDeleteComment({ commentId: id });
    setToast({ show: true, message: "Comment Deleted" });
    console.log(resp);
  };

  /**
   *
   * @param param0
   */
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
    setToast({ show: true, message: "Comment Added" });
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
        {/* ION TOAST */}
        <CommentToast
          isOpen={toast.show}
          onDidDismiss={() => setToast({ show: false, message: "" })}
          message={toast.message}
        />
        {data
          ? (data as Array<any>).map((d) => {
              return (
                <CommentItem key={d.id} data={d} handleClick={deleteComment} />
              );
            })
          : null}
      </IonContent>
    </IonPage>
  );
};

const CommentItem = ({ data, handleClick }: any) => {
  return <IonItem onClick={() => handleClick(data.id)}>{data.body} </IonItem>;
};

const CommentToast = ({
  isOpen,
  onDidDismiss,
  message,
}: {
  isOpen: boolean;
  onDidDismiss: any;
  message: string;
}) => {
  return (
    <IonToast
      color="warning"
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      message={message}
      position="bottom"
      buttons={[
        {
          text: "Done",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ]}
    />
  );
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
