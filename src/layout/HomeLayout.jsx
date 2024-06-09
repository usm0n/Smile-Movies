import React from "react";
import Header from "../components/Home/header/Header";
import Movies from "../components/Home/main/Movies";
import NewMovies from "../components/Home/main/NewMovies";
import Footer from "../components/Footer/index";
import { useAllMovies } from "../contexts/Movies";
import { language } from "../utilities/defaultFunctions";
import { useUser } from "../contexts/User";
import { t } from "i18next";

function HomeLayout() {
  const { allMovies } = useAllMovies();
  const { isLoggedIn, user } = useUser();
  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        isLoading={allMovies.isLoading}
        movies={allMovies.movies}
        language={language}
        user={user}
      />
      <NewMovies
        movies={allMovies.movies}
        isLoading={allMovies.isLoading}
        language={language}
      />
      <Movies
        allMovies={allMovies}
        language={language}
        MoviesTitle={t("MoviesTitle")}
        MovieType={"movie"}
        NoMovies={t("NoMovies")}
        MoviesType={"movies"}
      />
      <Movies
        allMovies={allMovies}
        language={language}
        MoviesTitle={t("CartoonsTitle")}
        MovieType={"cartoon"}
        NoMovies={t("NoCartoons")}
        MoviesType={"cartoons"}
      />
      <Movies
        allMovies={allMovies}
        language={language}
        MoviesTitle={t("SeriesTitle")}
        MovieType={"series"}
        NoMovies={t("NoSeries")}
        MoviesType={"series"}
      />
      <Footer />
    </div>
  );
}

export default HomeLayout;
