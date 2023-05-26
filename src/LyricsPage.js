import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

const LyricsPageContainer = styled("div")({
  padding: "10px",
});

const LyricsTitle = styled(Typography)({
  marginBottom: "10px",
  fontSize: "28px",
  fontWeight: "bold",
});

const LyricsArtist = styled("p")({
  marginBottom: "5px",
  fontSize: "18px",
  color: "#555555",
});

const LyricsTags = styled(Typography)({
  marginTop: "5px",
  fontSize: "16px",
  color: "#888888",
});

const LyricsContent = styled("div")({
  marginTop: "20px",
  lineHeight: "1",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  userSelect: "none",
});

const LyricsLine = styled("p")({
  marginBottom: "10px",
  fontSize: "16px",
});

const LyricsPage = ({ lyrics }) => {
  const { id } = useParams();
  const lyric = lyrics.find((lyric) => lyric.id === id);

  if (!lyric) {
    return (
      <div
        className="lyrics-page"
        style={{
          lineHeight: "1.5",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "10px",
          textAlign: "center",
        }}
      >
        Lyrics not found.
      </div>
    );
  }

  return (
    <LyricsPageContainer>
      <LyricsTitle>{lyric.title}</LyricsTitle>
      {lyric.artist && (
        <LyricsArtist>
          Artist:{" "}
          <Link
            to={`/artist/${lyric.artist}`}
            style={{
              marginBottom: "5px",
              fontSize: "18px",
              color: "#3498db",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            {lyric.artist}
          </Link>
        </LyricsArtist>
      )}

      {/* <LyricsTags>Tags: {lyric.tags.join(", ")}</LyricsTags> */}
      <LyricsContent>
        {lyric.content.split("\n").map((line, index) => (
          <LyricsLine style={{ fontSize: "17px" }} key={index}>
            {line}
          </LyricsLine>
        ))}
      </LyricsContent>
    </LyricsPageContainer>
  );
};

export default LyricsPage;
