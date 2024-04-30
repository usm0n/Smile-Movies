import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "../assets/images/header.jpeg";
import VideoPlayerIcon from "../assets/icons/VideoPlayerIcon";
import ClockIcon from "../assets/icons/ClockIcon";
import SolidStarIcon from "../assets/icons/SolidStarIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
import { Box, Skeleton } from "@mui/material";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { swiperData } from "../data/swiperData";
import { useAllMovies } from "../contexts/AllMovies";

function Header() {
  const { allMovies } = useAllMovies();
  return !allMovies.isLoading ? (
    <section className="header">
      <>
        <Swiper
          slidesPerView={1}
          effect={"fade"}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="mySwiper"
        >
          {allMovies.movies
            .filter((m) => m.status.isTrending)
            .map((movie, key) => (
              <SwiperSlide>
                <img
                  src={movie.image.fullscreen}
                  className="header-bg"
                  alt=""
                />
                <div className="header-items">
                  <div className="header-links">
                    <Link to={`/${movie._id}`} className="header-link">
                      Watch Now <VideoPlayerIcon />
                    </Link>
                    <Link className="header-link_later">
                      Watch Later <ClockIcon />{" "}
                    </Link>
                  </div>
                </div>

                <div className="container">
                  <div className="header-info">
                    <h1 className="header-title">{movie.title.uz}</h1>
                    <div className="header-texts">
                      <div className="header-item">
                        <CalendarIcon />
                        <span className="header-year">
                          {movie.releaseDate.year}
                        </span>
                      </div>

                      <div className="header-item">
                        <ClockIcon />
                        <span className="header-year">
                          {movie.duration.hour}:{movie.duration.min}:00
                        </span>
                      </div>

                      <div className="header-item">
                        <span className="header-icon">
                          <SolidStarIcon />
                        </span>
                        <span className="header-year">{movie.rating.imdb}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
    </section>
  ) : (
      <Skeleton
        variant="rectangular"
        animation="pulse"
        sx={{
          backgroundColor: "#ffffff2f",
          width: "100%",
          height: "85vh",
        }}
      />
  );
}

export default Header;
