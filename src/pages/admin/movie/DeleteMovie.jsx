import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAllMovies } from "../../../contexts/Movies";
import { language } from "../../../utilities/defaultFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { useMovie } from "../../../contexts/Movie";

function DeleteMovie() {
  const { allMovies } = useAllMovies();
  const { getMovieId, movieById } = useMovie();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();

  const { movieId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length) {
      navigate(`/admin/delete-movie/search/${searchValue.toLowerCase()}`);
    }
  };

  useEffect(() => {
    getMovieId(movieId);
  }, []);

  return (
    <div className="admin-edit-movie">
      <form onSubmit={handleSubmit} className="admin-edit-movie-search-bar">
        <h1 className="admin-edit-movie-search-bar-title">
          Enter Movie Name that you want to delete
        </h1>
        <Autocomplete
          sx={{
            backgroundColor: "#fff",
            width: "300px",
            margin: "0 auto",
            borderRadius: "5px",
          }}
          disableClearable
          freeSolo
          options={allMovies.movies}
          onChange={(e, value) => setSearchValue(value.title[language])}
          getOptionLabel={(option) => `${option.title[language]}`}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              type="text"
              className="nav-search_bar_down-input"
            />
          )}
        />
      </form>
    </div>
  )
}

export default DeleteMovie;