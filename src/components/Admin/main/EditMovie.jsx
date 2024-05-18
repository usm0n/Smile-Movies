import React, { Children, useEffect, useState } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Button,
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Favourite from "../../../assets/icons/SolidStarIcon";
import PublicIcon from "@mui/icons-material/Public";
import Calendar from "../../../assets/icons/CalendarIcon";
import AddIcon from "@mui/icons-material/Add";
import {
  currentDay,
  currentMonth,
  currentYear,
  language,
  snackbar,
} from "../../../utilities/defaultFunctions";
import { useMovie } from "../../../contexts/Movie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";

function EditMovie({ movie }) {
  const { editMovie, statusEditMovie, getMovieId } = useMovie();

  const [active, setActive] = useState(false);
  const [toggleValue, setToggleValue] = useState({
    image: "portrait",
    title: "uz",
    video: "movie",
    page: "standart",
    notes: "uz",
  });
  const [editMovieValue, seteditMovieValue] = useState({
    title: {
      uz: movie.title.uz,
      ru: movie.title.ru,
      en: movie.title.en,
    },
    notes: {
      uz: movie.notes.uz,
      ru: movie.notes.ru,
      en: movie.notes.en,
    },
    description: {
      uz: movie.description.uz,
      ru: movie.description.ru,
      en: movie.description.en,
    },
    releaseDate: {
      day: movie.releaseDate.day,
      month: movie.releaseDate.month,
      year: movie.releaseDate.year,
    },
    duration: {
      hour: movie.duration.hour,
      min: movie.duration.min,
    },
    rating: {
      like: movie.rating.like,
      dislike: movie.rating.dislike,
      imdb: movie.rating.imdb,
    },
    country: {
      uz: movie.country.uz,
      ru: movie.country.ru,
      en: movie.country.en,
    },
    credit: {
      uz: movie.credit.uz,
      ru: movie.credit.ru,
      en: movie.credit.en,
    },
    image: {
      portrait: movie.image.portrait,
      fullscreen: movie.image.fullscreen,
    },
    status: {
      isNew: movie.status.isNew,
      isTrending: movie.status.isTrending,
      type: movie.status.type,
    },
    movie: movie.movie,
    trailer: movie.trailer,
  });

  const { movieId } = useParams();
  const [status, setStatus] = useState({
    isEmpty: false,
  });
  const navigate = useNavigate();

  const handleToggleValue = (e, name) => {
    setToggleValue({
      ...toggleValue,
      [name]: e.target.value,
    });
  };

  const handleExtraInput = (e, parent) => {
    setStatus({ isEmpty: false });
    seteditMovieValue({
      ...editMovieValue,
      [parent]: {
        ...editMovieValue[parent],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleInput = (e) => {
    setStatus({ isEmpty: false });
    seteditMovieValue({
      ...editMovieValue,
      [e.target.name]: e.target.value,
    });
  };

  const isNotTrim =
    !editMovieValue.country.en.trim() ||
    !editMovieValue.country.ru.trim() ||
    !editMovieValue.country.uz.trim() ||
    !editMovieValue.credit.en.trim() ||
    !editMovieValue.credit.ru.trim() ||
    !editMovieValue.credit.uz.trim() ||
    !editMovieValue.description.en.trim() ||
    !editMovieValue.description.ru.trim() ||
    !editMovieValue.description.uz.trim() ||
    !editMovieValue.image.fullscreen.trim() ||
    !editMovieValue.image.portrait.trim() ||
    !editMovieValue.movie.trim() ||
    !editMovieValue.title.en.trim() ||
    !editMovieValue.title.ru.trim() ||
    !editMovieValue.title.uz.trim() ||
    !editMovieValue.releaseDate.day.trim() ||
    !editMovieValue.releaseDate.month.trim() ||
    !editMovieValue.releaseDate.year.trim() ||
    !editMovieValue.trailer.trim() ||
    !editMovieValue.duration.hour.trim() ||
    !editMovieValue.duration.min.trim() ||
    editMovieValue.rating.like < 0 ||
    editMovieValue.rating.dislike < 0 ||
    !editMovieValue.rating.imdb.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ isEmpty: false });
    if (isNotTrim) {
      setStatus({ isEmpty: true });
    } else {
      editMovie(editMovieValue);
    }
  };

  useEffect(() => {
    getMovieId(movieId);
  }, []);

  return (
    <section className="movie">
      <Button
        onClick={() => navigate("/admin/edit-movie")}
        sx={{
          position: "absolute",
          top: "120px",
          left: "10px",
          display: "flex",
          gap: "10px",
          color: "#fff",
        }}
      >
        <ArrowBackIcon />
        Back to search
      </Button>
      {status.isEmpty && snackbar("warning", "Please fill all fields")}
      {statusEditMovie.isSuccess &&
        snackbar("success", "Movie edited successfully")}
      {statusEditMovie.isError && snackbar("error", "Something went wrong")}
      <div
        style={{
          position: "fixed",
          top: "80px",
          width: "100%",
          display: "flex",
          zIndex: "999",
        }}
      >
        <ToggleButtonGroup
          color="info"
          value={toggleValue.page}
          name="page"
          onChange={(e) => handleToggleValue(e, "page")}
          sx={{
            backgroundColor: "#fff",
            margin: "0 auto",
          }}
          exclusive
          aria-label="Platform"
        >
          <ToggleButton value="standart">Standart</ToggleButton>
          <ToggleButton value="extra">Extra</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <button
        onClick={(e) => handleSubmit(e)}
        disabled={
          isNotTrim || statusEditMovie.isSuccess || statusEditMovie.loading
        }
        className={
          isNotTrim || statusEditMovie.isSuccess || statusEditMovie.loading
            ? "admin-addmovie-btn disabled"
            : "admin-addmovie-btn"
        }
      >
        {statusEditMovie.loading ? (
          "Loading..."
        ) : (
          <>
            <Edit />
            Edit
          </>
        )}
      </button>
      {toggleValue.page == "standart" && (
        <div className="movie-container">
          <div className="movie-content">
            <div className="admin-change-img">
              <ToggleButtonGroup
                color="info"
                value={toggleValue.image}
                name="image"
                onChange={(e) => handleToggleValue(e, "image")}
                sx={{
                  backgroundColor: "gold",
                }}
                exclusive
                aria-label="Platform"
              >
                <ToggleButton value="portrait">Portrait</ToggleButton>
                <ToggleButton value="fullscreen">Full Screen</ToggleButton>
              </ToggleButtonGroup>
              <textarea
                onChange={(e) => handleExtraInput(e, "image")}
                name={toggleValue.image}
                value={editMovieValue.image[toggleValue.image]}
                placeholder={`${toggleValue.image} photo link`}
                className="admin-input"
              />
            </div>
            <div className="movie-info">
              <div className="movie-text">
                <div
                  style={{
                    gap: "20px",
                  }}
                  className="movie-first-section"
                >
                  <div className="admin-change-title">
                    <ToggleButtonGroup
                      color="info"
                      value={toggleValue.title}
                      name="title"
                      onChange={(e) => handleToggleValue(e, "title")}
                      sx={{
                        backgroundColor: "gold",
                      }}
                      exclusive
                      aria-label="Platform"
                    >
                      <ToggleButton value="uz">Uzbek</ToggleButton>
                      <ToggleButton value="ru">Russian</ToggleButton>
                      <ToggleButton value="en">English</ToggleButton>
                    </ToggleButtonGroup>
                    <input
                      value={editMovieValue.title[toggleValue.title]}
                      name={toggleValue.title}
                      type="text"
                      onChange={(e) => handleExtraInput(e, "title")}
                      placeholder={`${toggleValue.title.toUpperCase()} Movie Title`}
                      className={
                        active ? "admin-name_input active" : "admin-name_input"
                      }
                    />
                  </div>
                  <div className="movie-like-dislike">
                    <button className="movie-like">
                      <ThumbUpOffAltIcon />
                      <input
                        value={editMovieValue.rating.like}
                        name="like"
                        type="text"
                        onChange={(e) => handleExtraInput(e, "rating")}
                        placeholder={"Likes"}
                        className="admin-grade_input"
                      />
                    </button>
                    <button className="movie-dislike">
                      <ThumbDownOffAltIcon />
                      <input
                        value={editMovieValue.rating.dislike}
                        name="dislike"
                        type="text"
                        onChange={(e) => handleExtraInput(e, "rating")}
                        placeholder={"Dislikes"}
                        className="admin-grade_input"
                      />
                    </button>
                  </div>
                </div>
                <div className="movie-number_info">
                  <span className="movie-info_title">
                    <Calendar />
                    <input
                      value={editMovieValue.releaseDate.day}
                      name="day"
                      type="text"
                      onChange={(e) => handleExtraInput(e, "releaseDate")}
                      placeholder={currentDay}
                      className={
                        active
                          ? "admin-month_input active"
                          : "admin-month_input"
                      }
                    />
                    <input
                      value={editMovieValue.releaseDate.month}
                      name="month"
                      type="text"
                      onChange={(e) => handleExtraInput(e, "releaseDate")}
                      placeholder={currentMonth}
                      className={
                        active
                          ? "admin-month_input active"
                          : "admin-month_input"
                      }
                    />
                    <input
                      value={editMovieValue.releaseDate.year}
                      name="year"
                      type="text"
                      onChange={(e) => handleExtraInput(e, "releaseDate")}
                      placeholder={currentYear}
                      className={
                        active ? "admin-year_input active" : "admin-year_input"
                      }
                    />
                  </span>

                  <span className="movie-info_title">
                    <WatchLaterIcon />
                    <input
                      value={editMovieValue.duration.hour}
                      name="hour"
                      type="text"
                      onChange={(e) => handleExtraInput(e, "duration")}
                      placeholder={"hour"}
                      className={
                        active
                          ? "admin-month_input active"
                          : "admin-month_input"
                      }
                    />
                    :
                    <input
                      value={editMovieValue.duration.min}
                      name="min"
                      type="text"
                      onChange={(e) => handleExtraInput(e, "duration")}
                      placeholder={"min"}
                      className={
                        active
                          ? "admin-month_input active"
                          : "admin-month_input"
                      }
                    />
                  </span>

                  <span className="movie-info_title">
                    <span className="movie-info_icon">
                      <Favourite />
                    </span>
                    <input
                      onChange={(e) => handleExtraInput(e, "rating")}
                      value={editMovieValue.rating.imdb}
                      name="imdb"
                      placeholder="imdb"
                      type="text"
                      className={
                        active
                          ? "admin-grade_input active"
                          : "admin-grade_input"
                      }
                    />
                  </span>

                  <span className="movie-info_title">
                    <span className="movie-info_icon">
                      <PublicIcon />
                    </span>
                    <input
                      onChange={(e) => handleExtraInput(e, "country")}
                      value={editMovieValue.country[toggleValue.title]}
                      name={toggleValue.title}
                      placeholder={toggleValue.title.toUpperCase()}
                      type="text"
                      className={
                        active
                          ? "admin-country_input active"
                          : "admin-country_input"
                      }
                    />
                  </span>

                  <span className="movie-info_title">
                    <CheckIcon />
                    <input
                      onChange={(e) => handleExtraInput(e, "credit")}
                      placeholder={`${toggleValue.title.toUpperCase()} credit`}
                      value={editMovieValue.credit[toggleValue.title]}
                      name={toggleValue.title}
                      type="text"
                      className={active ? "admin-check active" : "admin-check"}
                    />
                  </span>
                </div>
              </div>
              <p className="movie-subtitle">
                <textarea
                  onChange={(e) => handleExtraInput(e, "description")}
                  value={editMovieValue.description[toggleValue.title]}
                  name={toggleValue.title}
                  placeholder={`${toggleValue.title.toUpperCase()} description`}
                  id=""
                  className={
                    active ? "admin-subtitle active" : "admin-subtitle"
                  }
                ></textarea>
              </p>
              <div className="movie-btns">
                <button disabled className="movie-btn disabled">
                  <StarBorderIcon /> Add to Favourite
                </button>
                <button disabled className="movie-btn disabled">
                  <AccessTimeIcon /> Add to Watch Later
                </button>
              </div>
            </div>
          </div>
          <div className="movie-video">
            <div className="movie-movie-container">
              <div className="admin-video">
                <ToggleButtonGroup
                  color="info"
                  value={toggleValue.video}
                  name="video"
                  onChange={(e) => handleToggleValue(e, "video")}
                  sx={{
                    backgroundColor: "gold",
                  }}
                  exclusive
                  aria-label="Platform"
                >
                  <ToggleButton value="movie">Movie</ToggleButton>
                  <ToggleButton value="trailer">Trailer</ToggleButton>
                </ToggleButtonGroup>
                <textarea
                  onChange={(e) => handleInput(e)}
                  name={toggleValue.video}
                  value={
                    toggleValue.video == "movie"
                      ? editMovieValue.movie
                      : editMovieValue.trailer
                  }
                  placeholder={
                    toggleValue.video == "movie" ? "Movie Link" : "Trailer Link"
                  }
                  width="100%"
                  className="movie-iframe admin-video-area"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
      {toggleValue.page == "extra" && (
        <div className="movie-container">
          <div className="admin-extra">
            <div className="admin-extra-status">
              <h1 className="admin-extra-status-title">Status:</h1>
              <div className="admin-extra-status-props">
                <div className="admin-extra-status-prop">
                  <h1 className="admin-extra-status-prop-title">isNew:</h1>
                  <FormControl
                    variant="filled"
                    sx={{
                      m: 1,
                      minWidth: 120,
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">isNew</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="isNew"
                      value={editMovieValue.status.isNew}
                      label="isNew"
                      onChange={(e) => handleExtraInput(e, "status")}
                    >
                      <MenuItem value={"true"}>True</MenuItem>
                      <MenuItem value={"false"}>False</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="admin-extra-status-prop">
                  <h1 className="admin-extra-status-prop-title">isTrending:</h1>
                  <FormControl
                    variant="filled"
                    sx={{
                      m: 1,
                      minWidth: 120,
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      isTrending
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="isTrending"
                      value={editMovieValue.status.isTrending}
                      label="isTrending"
                      onChange={(e) => handleExtraInput(e, "status")}
                    >
                      <MenuItem value={"true"}>True</MenuItem>
                      <MenuItem value={"false"}>False</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="admin-extra-status-prop">
                  <h1 className="admin-extra-status-prop-title">Type:</h1>
                  <FormControl
                    variant="filled"
                    sx={{
                      m: 1,
                      minWidth: 120,
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type"
                      value={editMovieValue.status.type}
                      label="type"
                      onChange={(e) => handleExtraInput(e, "status")}
                    >
                      <MenuItem value={"movie"}>Movie</MenuItem>
                      <MenuItem value={"series"}>Series</MenuItem>
                      <MenuItem value={"cartoon"}>Cartoon</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="admin-extra-notes">
              <h1 className="admin-extra-notes-title">Notes:</h1>
              <div className="admin-extra-notes-main">
                <ToggleButtonGroup
                  color="info"
                  value={toggleValue.notes}
                  name="notes"
                  onChange={(e) => handleToggleValue(e, "notes")}
                  sx={{
                    backgroundColor: "gold",
                  }}
                  exclusive
                  aria-label="Platform"
                >
                  <ToggleButton value="uz">Uzbek</ToggleButton>
                  <ToggleButton value="ru">Russian</ToggleButton>
                  <ToggleButton value="en">English</ToggleButton>
                </ToggleButtonGroup>
                <textarea
                  onChange={(e) => handleExtraInput(e, "notes")}
                  value={editMovieValue.notes[toggleValue.notes]}
                  name={toggleValue.notes}
                  placeholder={`Note for ${toggleValue.notes}`}
                  width="100%"
                  className="admin-extra-notes-area"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EditMovie;