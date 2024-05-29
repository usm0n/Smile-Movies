import { createContext, useContext, useEffect, useState } from "react";
import comments from "../service/api/comments.api.service";
import { userId } from "../utilities/defaultFunctions";
import { useUser } from "./User";

const CommentsContext = createContext({
  allComments: {
    isLoading: false,
    isError: false,
    isEmpty: false,
    comments: [],
  },
  postCommentStatus: {
    buttonLoading: false,
    isError: false,
    isSuccess: false,
  },
  deleteCommentStatus: {
    buttonLoading: false,
    isError: false,
    isSuccess: false,
  },
  updateCommentStatus: {
    loading: false,
    isError: false,
    isSuccess: false,
  },
  ratingLoading: false,
  getCommentId: (commentId) => {},
  getMovieId: (movieId) => {},
  postComment: (firstname, comment) => {},
  deleteComment: () => {},
  updateComment: (commentId, data) => {},
  likeComment: (commentId, comment) => {},
  dislikeComment: (commentId, comment) => {},
});

export const useComments = () => useContext(CommentsContext);
const CommentsProvider = ({ children }) => {
  const { isAdmin } = useUser();
  const [allComments, setAllComments] = useState({
    isLoading: false,
    isError: false,
    isEmpty: false,
    comments: [],
  });
  const [deleteCommentStatus, setDeleteCommentStatus] = useState({
    buttonLoading: false,
    isError: false,
    isSuccess: false,
  });
  const [postCommentStatus, setPostCommentStatus] = useState({
    buttonLoading: false,
    isError: false,
    isSuccess: false,
  });
  const [updateCommentStatus, setUpdateCommentStatus] = useState({
    loading: false,
    isError: false,
    isSuccess: false,
  });
  const [ratingLoading, setRatingLoading] = useState();
  const [commentId, setCommentId] = useState();
  const [movieId, setMovieId] = useState();

  const getCommentId = (commentId) => {
    setCommentId(commentId);
  };

  const getMovieId = (movieId) => {
    setMovieId(movieId);
  };

  const postComment = async (firstname, comment) => {
    setPostCommentStatus({
      buttonLoading: true,
      isError: false,
      isSuccess: false,
    });
    await comments
      .postComment(movieId, {
        firstname: firstname,
        comment: comment,
        isAdmin: isAdmin.result,
      })
      .then((res) => {
        setPostCommentStatus({
          buttonLoading: false,
          isError: false,
          isSuccess: true,
        });
        localStorage.setItem(`comment${res.data.comment._id}`, "posted");
      })
      .catch(() => {
        setPostCommentStatus({
          buttonLoading: false,
          isError: true,
          isSuccess: false,
        });
      });
  };

  const deleteComment = async () => {
    setDeleteCommentStatus({
      buttonLoading: true,
      isError: false,
      isSuccess: false,
    });
    await comments
      .deleteComment(movieId, commentId)
      .then(() => {
        setDeleteCommentStatus({
          buttonLoading: false,
          isError: false,
          isSuccess: true,
        });
        localStorage.removeItem(`comment${commentId}`);
        window.location.reload();
      })
      .catch(() => {
        setDeleteCommentStatus({
          buttonLoading: false,
          isError: true,
          isSuccess: false,
        });
      });
  };

  const updateComment = async (commentId, data) => {
    setUpdateCommentStatus({
      loading: true,
      isError: false,
      isSuccess: false,
    });
    await comments
      .updateComment(movieId, commentId, data)
      .then(() => {
        setUpdateCommentStatus({
          loading: false,
          isError: false,
          isSuccess: true,
        });
      })
      .catch(() => {
        setUpdateCommentStatus({
          loading: false,
          isError: true,
          isSuccess: false,
        });
      });
  };

  const likeComment = async (commentId, comment) => {
    setRatingLoading(true);
    await comments
      .updateComment(movieId, commentId, {
        firstname: comment.firstname,
        comment: comment.comment,
        isAdmin: comment.isAdmin,
        like: localStorage.getItem(`likeComment${commentId}`)
          ? comment.like - 1
          : comment.like + 1,
        dislike: localStorage.getItem(`dislikeComment${commentId}`)
          ? comment.dislike - 1
          : comment.dislike,
      })
      .then(() => {
        localStorage.getItem(`likeComment${commentId}`)
          ? localStorage.removeItem(`likeComment${commentId}`)
          : localStorage.setItem(`likeComment${commentId}`, true);
        localStorage.getItem(`dislikeComment${commentId}`)
          ? localStorage.removeItem(`dislikeComment${commentId}`)
          : null;
        setRatingLoading(false);
        window.location.reload();
      });
  };

  const dislikeComment = async (commentId, comment) => {
    setRatingLoading(true);
    await comments
      .updateComment(movieId, commentId, {
        firstname: comment.firstname,
        comment: comment.comment,
        isAdmin: comment.isAdmin,
        like: localStorage.getItem(`likeComment${commentId}`)
          ? comment.like - 1
          : comment.like,
        dislike: localStorage.getItem(`dislikeComment${commentId}`)
          ? comment.dislike - 1
          : comment.dislike + 1,
      })
      .then(() => {
        localStorage.getItem(`likeComment${commentId}`)
          ? localStorage.removeItem(`likeComment${commentId}`)
          : null;
        localStorage.getItem(`dislikeComment${commentId}`)
          ? localStorage.removeItem(`dislikeComment${commentId}`)
          : localStorage.setItem(`dislikeComment${commentId}`, true);
        setRatingLoading(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    setAllComments({
      isLoading: true,
      isError: false,
      isEmpty: false,
      comments: [],
    });
    comments
      .getComments(movieId)
      .then((comment) => {
        if (!comment.data) {
          if (comment.response.data.message == "Comments not found") {
            setAllComments({
              isLoading: false,
              isError: false,
              isEmpty: true,
              comments: [],
            });
          } else {
            setAllComments({
              isLoading: false,
              isError: true,
              isEmpty: false,
              comments: [],
            });
          }
        } else {
          setAllComments({
            isLoading: false,
            isError: false,
            isEmpty: false,
            comments: comment.data,
          });
        }
      })
      .catch(() => {
        setAllComments({
          isLoading: false,
          isError: true,
          isEmpty: false,
          comments: [],
        });
      });
  }, [movieId]);

  return (
    <CommentsContext.Provider
      value={{
        getCommentId,
        allComments,
        getMovieId,
        postComment,
        postCommentStatus,
        deleteComment,
        deleteCommentStatus,
        updateComment,
        updateCommentStatus,
        dislikeComment,
        likeComment,
        ratingLoading,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
