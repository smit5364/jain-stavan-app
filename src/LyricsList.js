import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const LyricsListContainer = styled("div")(({ theme }) => ({
  marginTop: "20px",
}));

const LyricsLink = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: "20px",
  padding: "20px",
  borderRadius: "8px",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LyricsTitle = styled(Typography)({
  marginBottom: "10px",
  fontSize: "24px",
  color: "inherit",
});

const LyricsTags = styled(Typography)({
  marginTop: "5px",
  fontSize: "14px",
  color: ({ theme }) => theme.palette.text.secondary,
});

const LyricsList = ({ lyrics }) => {
  return (
    <LyricsListContainer>
      <Typography
        variant="h4"
        component="h2"
        style={{ marginBottom: "20px" }}
      >
        Filtered Lyrics:
      </Typography>
      {lyrics.map((lyric) => (
        <LyricsLink to={`/lyric/${lyric.id}`} key={lyric.id}>
          <div>
            <LyricsTitle variant="h5" component="h3">
              {lyric.title}
            </LyricsTitle>
            <LyricsTags>Tags: {lyric.tags.join(", ")}</LyricsTags>
          </div>
        </LyricsLink>
      ))}
    </LyricsListContainer>
  );
};

export default LyricsList;
