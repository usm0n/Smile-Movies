import React, { useEffect } from "react";
import { useUser } from "../../contexts/User";
import RowMovieCard from "../../components/MovieCard/RowMovieCard";
import RowMovieCardSkeleton from "../../components/MovieCard/Skeleton/RowMovieCardSkeleton";
import { Skeleton } from "@mui/material";
import { useFavourites } from "../../contexts/Favourites";
import { backdropLoading, language } from "../../utilities/defaultFunctions";
import { t } from "i18next";
import NotFound from "../error/NotFound";

function Favorites() {
  const { user, isLoggedIn, isRealUser } = useUser();
  const { favourites, getFavourites } = useFavourites();

  useEffect(() => {
    if (isLoggedIn) {
      getFavourites();
    }
  }, [isLoggedIn]);
  return isLoggedIn ? (
    <div className="watch-later">
      <div className="watch-later-info">
        <h1 className="watch-later-info_title">{t("MenuFavouritesText")}</h1>
        <h1 className="watch-later-info_fullname">
          {isRealUser.loading ? (
            <Skeleton
              sx={{
                backgroundColor: "#ffffff2f",
                width: "150px",
              }}
            ></Skeleton>
          ) : (
            <>
              {user.firstname} {user.lastname}
            </>
          )}
        </h1>
        <h1 className="watch-later-info_count-of-videos">
          {favourites.loading ? (
            <Skeleton
              sx={{
                backgroundColor: "#ffffff2f",
                width: "100px",
              }}
            />
          ) : (
            <>
              {language == "en" &&
                (favourites.result.length ? favourites.result.length : "No") +
                  " results found"}
              {language == "uz" &&
                (favourites.result.length
                  ? favourites.result.length + " natija topildi"
                  : "Natijalar topilmadi")}
              {language == "ru" &&
                (favourites.result.length
                  ? "Найдено " + favourites.result.length + " результатов"
                  : "Результатов не найдено")}
            </>
          )}
        </h1>
        {!favourites.loading && (
          <h1 className="watch-later-not-found">
            {language == "en" &&
              !favourites.result.length &&
              "No results found"}
            {language == "uz" &&
              !favourites.result.length &&
              "Natijalar topilmadi"}
            {language == "ru" &&
              !favourites.result.length &&
              "Результатов не найдено"}
          </h1>
        )}
      </div>
      <div className="watch-later-movies">
        {!favourites.loading ? (
          favourites.result.map((movie, index) => {
            return <RowMovieCard movie={movie} key={index} />;
          })
        ) : (
          <>
            {/* <RowMovieCardSkeleton />
            <RowMovieCardSkeleton />
            <RowMovieCardSkeleton />
            <RowMovieCardSkeleton /> */}
            {backdropLoading(open)}
          </>
        )}
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

export default Favorites;
