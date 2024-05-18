import React, { useEffect } from "react";
import { useAllMovies } from "../../../contexts/Movies";
import MovieSkeletonCard from "../../MovieCard/Skeleton/MovieCardSkeleton";
import MovieCard from "../../MovieCard/MovieCard";
import { Grid } from "@mui/material";
import { t } from "i18next";

function Series({ allMovies, language }) {
  return (
    <section className="movies">
      <div className="container">
        <div className="movies-content">
          <h1 className="movies-title">{t("SeriesTitle")}</h1>
          <div className="movies-movies">
            <div className="movies-cards">
              {allMovies.isLoading ? (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MovieSkeletonCard />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MovieSkeletonCard />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MovieSkeletonCard />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MovieSkeletonCard />
                  </Grid>
                </>
              ) : allMovies.movies.filter((m) => m.status.type === "series")
                  .length > 0 ? (
                allMovies.movies
                  .filter((m) => m.status.type === "series")
                  .map((movie) => (
                    <MovieCard
                      linkTo={`/movie/${movie._id}`}
                      movie={movie}
                      language={language}
                    />
                  ))
              ) : (
                <h1>{t("NoSeries")}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Series;