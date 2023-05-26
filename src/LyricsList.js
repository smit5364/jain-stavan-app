import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Translate } from "@mui/icons-material";

const LyricsListContainer = styled("div")(({ theme }) => ({
  marginTop: "20px",
}));

const LyricsLink = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: "6px",
  padding: "10px",
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
  marginBottom: "4px",
  fontSize: "17px",
  color: "black",
});

// const LyricsTags = styled(Typography)({
//   marginTop: "0px",
//   fontSize: "10px",
//   color: ({ theme }) => theme.palette.text.secondary,
// });

const LyricsID = styled(Typography)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "-10px",
  marginTop: "-10px",
  marginBottom: "-10px",
  height: "60px",
  width: "40px",
  WebkitBorderBottomLeftRadius: "5px",
  borderTopLeftRadius: "5px",
  backgroundColor: "#F50057",
  color: "#FFFFFF",
  zIndex: 1,
});


const LyricsContent = styled("div")({
  marginLeft: "45px",
});

const LyricsList = ({ lyrics }) => {
  return (
    <LyricsListContainer  >
      {/* <Typography variant="h4" component="h2" style={{ marginBottom: "20px" }}>
        Filtered Lyrics:
      </Typography> */}
      {lyrics.map((lyric) => (
        <LyricsLink style={{height:"40px",}} to={`/lyric/${lyric.id}`} key={lyric.id}>
          <div style={{ position: "relative" }}>
            <LyricsID variant="body1" component="span">
              {lyric.numbering}
            </LyricsID>
            <LyricsContent>
              <LyricsTitle variant="h5" component="h3">
                {lyric.title}
              </LyricsTitle>
              {/* <LyricsTags>Tags: {lyric.tags.join(", ")}</LyricsTags> */}
              <Typography style={{fontSize:"11px"}}>{lyric.content.split("\n")[0]}</Typography>
            </LyricsContent>
          </div>
        </LyricsLink>
      ))}
    </LyricsListContainer>
  );
};

export default LyricsList;
