import axios from "axios";

const api = axios.create({
  baseURL: "https://smile-movies-project.onrender.com",
});

const comments = {
  getComments: async (movieId) => {
    try {
      const response = await api.get("/movies/" + movieId + "/comments");
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getComment: async (movieId, commentId) => {
    try {
      const response = await api.get(
        "/movies/" + movieId + "/comment/" + commentId
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  postComment: async (movieId, data) => {
    try {
      const response = await api.post(
        "/movies/" + movieId + "/postComment",
        data
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteComment: async (movieId, commentId) => {
    try {
      const response = await api.delete(
        "/movies/" + movieId + "/comment/" + commentId
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default comments;
