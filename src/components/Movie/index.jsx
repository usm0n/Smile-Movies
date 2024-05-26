import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User";
import { Button } from "@mui/material";
import { language } from "../../utilities/defaultFunctions";
import { Helmet } from "react-helmet";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MovieContent from "./MovieContent";
import MovieVideo from "./MovieVideo";
import MovieComments from "./MovieComments";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Movie({ movie, likeMovie, dislikeMovie }) {
  const { isLoggedIn, user, isAdmin } = useUser();

  const navigate = useNavigate();

  return (
    <section key={movie._id} className="movie">
      <Helmet>
        <meta
          name="description"
          content="2024 yilning eng yaxshi yangi kinolari haqida barcha ma'lumotlarni bizning saytimizda toping."
        />
        <meta
          name="keywords"
          content={`${movie.title.uz}, ${movie.title.ru}, ${movie.title.en}`}
        />
        <title>{movie.title[language]} - Smile Movies</title>
      </Helmet>
      <Button
        onClick={() => navigate("/")}
        sx={{
          position: "fixed",
          top: "90px",
          left: "20px",
          zIndex: "1000",
          color: "black",
          backgroundColor: "gold",
          borderRadius: "50px",
          transition: "ease-in-out 0.2s",
          "&:hover": {
            backgroundColor: "gold",
            opacity: "0.8",
          },
        }}
      >
        <ArrowBack />
      </Button>
      {isAdmin.result && (
        <div className="movie-admin">
          <IconButton
            onClick={() => navigate(`/admin/edit-movie/${movie._id}`)}
            sx={{
              color: "white",
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/admin/delete-movie/${movie._id}`)}
            sx={{
              color: "white",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      <div className="movie-container">
        <MovieContent dislikeMovie={dislikeMovie} likeMovie={likeMovie} movie={movie} user={user} isLoggedIn={isLoggedIn} />
        <MovieVideo movie={movie} />
        <MovieComments isAdmin={isAdmin} isLoggedIn={isLoggedIn} movie={movie} user={user} />
      </div>
    </section>
  );
}

export default Movie;
