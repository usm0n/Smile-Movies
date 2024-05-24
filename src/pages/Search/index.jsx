import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAllMovies } from "../../contexts/Movies";
import { Box, Button, Grid, Typography } from "@mui/material";
import MovieCard from "../../components/MovieCard/MovieCard";
import { language } from "../../utilities/defaultFunctions";
import MovieSkeletonCard from "../../components/MovieCard/Skeleton/MovieCardSkeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { t } from "i18next";

function Search({ backTo, linkTo }) {
  const { value } = useParams();
  const { allMovies } = useAllMovies();
  const navigate = useNavigate();

  const prods = allMovies.movies.filter((m) => {
    return (
      m.title.uz.toLowerCase().includes(value.toLowerCase()) ||
      m.title.en.toLowerCase().includes(value.toLowerCase()) ||
      m.title.ru.toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className="search">
      <Button
        onClick={() => navigate(backTo)}
        sx={{
          position: "absolute",
          top: "80px",
          left: "10px",
          display: "flex",
          gap: "10px",
          color: "#fff",
        }}
      >
        <ArrowBackIcon />
      </Button>
      {allMovies.isLoading ? (
        <>
          <Grid
            sx={{ display: "flex", flexWrap: "wrap" }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <MovieSkeletonCard />
            <MovieSkeletonCard />
            <MovieSkeletonCard />
            <MovieSkeletonCard />
            <MovieSkeletonCard />
            <MovieSkeletonCard />
            <MovieSkeletonCard />
            <MovieSkeletonCard />
          </Grid>
        </>
      ) : (
        <>
          <h1 className="search-title">{t("SearchPlaceholder")}: {value}</h1>
          <h1 className="search-not-found">
            {language == "en" &&
              (prods.length ? prods.length : "No") + " results found"}
            {language == "uz" &&
              (prods.length
                ? prods.length + " natija topildi"
                : "Natijalar topilmadi")}
            {language == "ru" &&
              (prods.length
                ? "Найдено " + prods.length + " результатов"
                : "Результатов не найдено")}
          </h1>
          <Grid
            container
            spacing={10}
            justifyContent="flex-start"
            alignItems="stretch"
            className="search-found"
          >
            {prods.map((m, i) => {
              return (
                <>
                  <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                    <MovieCard
                      linkTo={`${linkTo}/${m._id}`}
                      movie={m}
                      language={language}
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
}

export default Search;
