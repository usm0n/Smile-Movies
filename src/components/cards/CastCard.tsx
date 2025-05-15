import { Avatar, Card, Typography } from "@mui/joy";
import { movieCredits } from "../../tmdb-res";

function CastCard({ actor }: { actor: movieCredits["cast"][0] }) {
  return (
    <Card
      sx={{
        border: "none",
        textAlign: "center",
        backgroundColor: "transparent",
        gap: 1,
      }}
    >
      <Avatar
        sx={{
          width: "120px",
          height: "120px",
        }}
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
      >
        {actor.name
          ?.split(" ")
          ?.map((n) => n[0])
          ?.join("")}
      </Avatar>
      <Typography>{actor.name}</Typography>
      <Typography level="body-sm">{actor.character}</Typography>
    </Card>
  );
}

export default CastCard;
