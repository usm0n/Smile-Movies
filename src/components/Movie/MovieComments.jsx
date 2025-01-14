import React, { useEffect, useState } from "react";
import { useComments } from "../../contexts/Comments";
import { t } from "i18next";
import { backdropLoading, snackbar } from "../../utilities/defaultFunctions";
import Comment from "./Comment/index";

function MovieComments({ movie, user, isLoggedIn, isAdmin }) {
  const {
    allComments,
    postComment,
    postCommentStatus,
    likeComment,
    dislikeComment,
    ratingLoading,
    updateComment,
    updateCommentStatus,
    getComments,
  } = useComments();

  const [postCommentComment, setPostCommentComment] = useState();
  const [postCommentName, setPostCommentName] = useState(user.firstname);
  const [editComment, setEditComment] = useState({
    firstname: "",
    comment: "",
    open: false,
    commentId: "",
    isAdmin: false,
    like: 0,
    dislike: 0,
  });

  useEffect(() => {
    getComments(movie._id);
  }, [movie._id]);
  return (
    <div className="movie-comments">
      <h1 className="movie-comments-title">{t("CommentsTitle")}</h1>
      <div className="movie-comments-posting">
        {backdropLoading(ratingLoading == true)}
        {postCommentStatus.isSuccess &&
          snackbar("success", t("YourCommentPostedSuccessfully"))}
        {postCommentStatus.isError &&
          snackbar("danger", t("somethingWentWrong"))}
        {editComment.open == true ? (
          <>
            <input
              onChange={(e) =>
                setEditComment({
                  firstname: e.target.value,
                  comment: editComment.comment,
                  open: true,
                  commentId: editComment.commentId,
                  isAdmin: editComment.isAdmin,
                  like: editComment.like,
                  dislike: editComment.dislike,
                })
              }
              value={editComment.firstname}
              className="movie-comments-posting-input"
              placeholder={t("CommentsNameInputPlaceholder")}
              type="text"
            />
            <textarea
              onChange={(e) =>
                setEditComment({
                  firstname: editComment.firstname,
                  comment: e.target.value,
                  open: true,
                  commentId: editComment.commentId,
                  isAdmin: editComment.isAdmin,
                  like: editComment.like,
                  dislike: editComment.dislike,
                })
              }
              value={editComment.comment}
              className="movie-comments-posting-area"
              placeholder={t("CommentInputPlaceholder")}
            ></textarea>
            <button
              disabled={
                !editComment.comment ||
                !editComment.firstname ||
                updateCommentStatus.loading ||
                updateCommentStatus.isSuccess
              }
              onClick={() => {
                updateComment(movie._id, editComment.commentId, {
                  firstname: editComment.firstname,
                  comment: editComment.comment,
                  isAdmin: editComment.isAdmin,
                  like: editComment.like,
                  dislike: editComment.dislike,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
              className={
                !editComment.comment ||
                !editComment.firstname ||
                updateCommentStatus.loading ||
                updateCommentStatus.isSuccess
                  ? "movie-comments-posting-button disabled"
                  : "movie-comments-posting-button"
              }
            >
              {updateCommentStatus.loading ? "Loading..." : t("Edit")}
            </button>
            <button
              onClick={() =>
                setEditComment({
                  firstname: "",
                  comment: "",
                  open: false,
                  commentId: "",
                  isAdmin: false,
                  like: 0,
                  dislike: 0,
                })
              }
              className="movie-comments-posting-button"
            >
              {t("cancel")}
            </button>
          </>
        ) : (
          <>
            {!isLoggedIn && (
              <input
                onChange={(e) => setPostCommentName(e.target.value)}
                value={postCommentName}
                className="movie-comments-posting-input"
                placeholder={t("CommentsNameInputPlaceholder")}
                type="text"
              />
            )}
            <textarea
              onChange={(e) => setPostCommentComment(e.target.value)}
              value={postCommentComment}
              className="movie-comments-posting-area"
              placeholder={t("CommentInputPlaceholder")}
            ></textarea>
            <button
              disabled={
                !postCommentComment ||
                !postCommentName ||
                postCommentStatus.buttonLoading ||
                postCommentStatus.isSuccess
              }
              onClick={() => {
                postComment(movie._id, postCommentName, postCommentComment);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
              className={
                !postCommentComment ||
                !postCommentName ||
                postCommentStatus.buttonLoading ||
                postCommentStatus.isSuccess
                  ? "movie-comments-posting-button disabled"
                  : "movie-comments-posting-button"
              }
            >
              {postCommentStatus.buttonLoading && "Loading..."}
              {!postCommentStatus.buttonLoading && t("SendCommentButtonText")}
            </button>
          </>
        )}
      </div>
      {allComments.isEmpty ? (
        <h1 className="movie-comments-empty-text">{t("NoComments")}</h1>
      ) : (
        !allComments.isLoading &&
        allComments.comments.map((comment, index) => {
          return (
            <Comment
              movie={movie}
              setEditComment={setEditComment}
              setPostCommentComment={setPostCommentComment}
              likeComment={likeComment}
              dislikeComment={dislikeComment}
              isAdmin={isAdmin}
              comment={comment}
              index={index}
            />
          );
        })
      )}
    </div>
  );
}

export default MovieComments;
