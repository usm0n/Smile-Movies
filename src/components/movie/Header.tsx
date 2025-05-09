"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardCover,
  Typography,
} from "@mui/joy";
import { images, movieDetails, tvDetails, videos } from "../../tmdb-res";
import { useState } from "react";
import { PlayArrow } from "@mui/icons-material";
import { minuteToHour, ymdToDmy } from "../../utilities/defaults";
import BlurImage from "../../utilities/blurImage";
import { useNavigate } from "react-router-dom";

function Header({
  movieImages,
  movieDetails,
  movieVideos,
  movieId,
  movieType,
}: {
  movieImages: images;
  movieDetails: movieDetails & tvDetails;
  movieId: string | number;
  movieType: "movie" | "tv";
  movieVideos: videos;
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();
  const trailerKey = movieVideos?.results?.filter(
    (video) => video?.type == "Trailer"
  )[0]?.key;
  const isTrailerAvailable = movieVideos?.results?.filter(
    (video) => video?.type == "Trailer"
  ).length;
  const movieLogo = movieImages?.logos?.filter(
    (logo) => logo.iso_639_1 === "en"
  )[0]?.file_path;
  return (
    <Card
      sx={{
        width: "100%",
        height: "100vh",
         "@media (max-width: 700px)": {
            height: "70vh",
         }
      }}
    >
      <CardCover>
        {BlurImage({
          highQualitySrc: `https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`,
          lowQualitySrc: `https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`,
          style: {
            display: isVideoLoaded ? "none" : "block",
          },
        })}
        <iframe
          onLoad={() => {
            if (isTrailerAvailable) {
              setTimeout(() => {
                setIsVideoLoaded(true);
              }, 2000);
            } else {
              setIsVideoLoaded(false);
              (window as any).onYouTubeIframeAPIReady.stopVideo();
            }
          }}
          onErrorCapture={() => {
            setIsVideoLoaded(false);
          }}
          style={{
            display: isVideoLoaded ? "block" : "none",
          }}
          width={"100%"}
          height={"100%"}
          frameBorder={"0"}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&mute=1&loop=1&playlist=${trailerKey}`}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 150px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Box
          sx={{
            gap: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "70px",
            "@media (max-width: 700px)": {
              padding: "20px",
              gap: 2,
              alignItems: "center",
            },
          }}
        >
          {movieImages?.logos
            ?.filter((logo) => logo.iso_639_1 === "en")[0]
            ?.file_path.trim() ? (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/original${movieLogo}`}
              sx={{
                width: "auto",
                maxHeight: "100px",
                objectFit: "contain",
                "@media (max-width: 700px)": {
                    maxWidth: "100%",
                    margin: "0 auto",
                    height: "auto",
                }
              }}
            />
          ) : (
            <Typography level="h1">
              {movieDetails?.name || movieDetails?.title}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              "@media (max-width: 700px)": {
                flexDirection: "column",
                gap: 1,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  navigate(`/${movieType}/${movieId}/watch`);
                }}
                disabled={
                  new Date(
                    movieDetails?.release_date ||
                      movieDetails?.first_air_date ||
                      ""
                  ).getTime() > Date.now()
                }
                startDecorator={<PlayArrow />}
                sx={{
                  padding: "15px 20px",
                  width: "300px",
                  color: "black",
                  backgroundColor: "rgb(255, 220, 95)",
                  "&:hover": {
                    backgroundColor: "rgb(255, 220, 95, 0.9)",
                  },
                  "&:active": {
                    backgroundColor: "rgb(255, 220, 95, 0.8)",
                  },
                }}
                size="lg"
              >
                {movieType == "tv" ? "Play S1E1" : "Watch Now"}
              </Button>
              <Typography level="body-sm">
                {new Date(
                  movieDetails?.release_date ||
                    movieDetails?.first_air_date ||
                    ""
                ).getTime() > Date.now()
                  ? movieDetails?.status
                  : ""}
              </Typography>
            </Box>
            <Box
              sx={{
                "@media (max-width: 700px)": {
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                },
              }}
            >
              {movieDetails?.overview && (
                <>
                  <Typography>
                    {movieDetails?.overview.length > 100 ? (
                      <>
                        {movieDetails?.overview.slice(0, 100)}...
                        <Button
                          variant="plain"
                          size="sm"
                          onClick={() => alert(movieDetails?.overview)}
                        >
                          more
                        </Button>
                      </>
                    ) : (
                      movieDetails?.overview
                    )}
                  </Typography>
                </>
              )}
              <Typography level="body-sm">
                {movieDetails?.genres.length
                  ? movieDetails?.genres.map((genre) => genre.name).join(", ") +
                    " • "
                  : ""}
                {ymdToDmy(
                  movieDetails?.release_date || movieDetails?.first_air_date
                )}{" "}
                {movieDetails?.runtime || movieDetails?.episode_run_time?.length
                  ? " • " +
                    minuteToHour(
                      movieDetails?.runtime || movieDetails?.episode_run_time[0]
                    )
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
export default Header;
