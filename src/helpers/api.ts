const BASE_URL = "http://localhost:3000";

export const getAllComments = async (key: string, postId: string) => {
  return new Promise(async (resolve) => {
    let r = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    let data = await r.json();
    setTimeout(() => resolve(data), 1000);
  });
};

export const addComment = async ({
  commentBody,
  postId,
}: {
  commentBody: string;
  postId: string;
}) => {
  try {
    return await fetch(`${BASE_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: commentBody, postId }),
    });
  } catch (error) {
    return error;
  }
};

export const deleteComment = async ({ commentId }: any) => {
  try {
    return await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return error;
  }
};
