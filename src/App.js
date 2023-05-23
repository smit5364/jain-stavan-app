import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { lyrics } from "./data.js";
import TagList from "./TagList";
import LyricsList from "./LyricsList";
import LyricsPage from "./LyricsPage";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 10,
  width: "4ch",
  paddingInline: 4,
  "&:focus-within": {
    width: "auto",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    padding: theme.spacing(0, 1),
  },
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

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

const ArtistSongsPage = ({}) => {
  const { artistName } = useParams();
  const artistSongs = lyrics;

  console.log("Artist:", artistName);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  if (!artistSongs || artistSongs.length === 0) {
    return (
      <div className="lyrics-page">
        No songs found for the artist {artistName}.
      </div>
    );
  }

  const tags = [
    "Pop",
    "Rock",
    "Rap",
    "Love",
    "Dance",
    "Summer",
    "Empowerment",
    "Urban",
  ];

  const filteredSongsByArtist = artistSongs.filter(
    (song) => song.artist.toLowerCase() === artistName.toLowerCase()
  );

  const handleSongClick = (songId) => {
    navigate(`/lyrics/${songId}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredSongsWithSearchAndTags = filteredSongsByArtist.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      selectedTags.every((tag) => song.tags.includes(tag))
  );

  return (
    <div className="artist-songs-page">
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 0 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="white"
          sx={{
            flexGrow: 1,
            display: { xs: "block", sm: "block" },
            textDecoration: "none", // Remove text decoration
          }}
        >
          <Link
            to="/lyrics"
            style={{ color: "white", textDecoration: "none" }}
          >
            MUIs
          </Link>
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </Search>
      </Toolbar>
    </AppBar>
  </Box>
  <TagList
          tags={tags}
          selectedTags={selectedTags}
          onSelectTag={handleTagSelect}
        />
      <LyricsListContainer>
      <Typography
        variant="h4"
        component="h2"
        style={{ marginBottom: "20px" }}
      >
        Songs by {artistName}
      </Typography>
      {filteredSongsWithSearchAndTags.map((song) => (
        <LyricsLink to={`/lyric/${song.id}`} key={song.id}>
          <div>
            <LyricsTitle variant="h5" component="h3">
              {song.title}
            </LyricsTitle>
            <LyricsTags>Tags: {song.tags.join(", ")}</LyricsTags>
          </div>
        </LyricsLink>
      ))}
    </LyricsListContainer>
    </div>
    
  );
};


const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredLyrics, setFilteredLyrics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isArtistSongsPage = location.pathname.includes("/artist/");
  const isLyricsPage = location.pathname.includes("lyrics");
  

  const tags = [
    "Pop",
    "Rock",
    "Rap",
    "Love",
    "Dance",
    "Summer",
    "Empowerment",
    "Urban",
  ];

  useEffect(() => {
    const filtered = lyrics.filter((lyric) =>
      selectedTags.every((selectedTag) => lyric.tags.includes(selectedTag))
    );
    setFilteredLyrics(filtered);
  }, [selectedTags]);

  useEffect(() => {
    const filtered = filteredLyrics.filter(
      (lyric) =>
        lyric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lyric.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        lyric.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/lyrics?search=${encodeURIComponent(searchQuery)}`);
  };

  // Handle initial search query from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";
    setSearchQuery(search);
  }, [location.search]);

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredSearch = filteredLyrics.filter(
    (lyric) =>
      lyric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lyric.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      lyric.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 0 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="white"
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "block" },
                textDecoration: "none", // Remove text decoration
              }}
            >
              <Link
                to="/lyrics"
                style={{ color: "white", textDecoration: "none" }}
              >
                MUI
              </Link>
            </Typography>

            <form onSubmit={handleSearchSubmit}>
          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearch}
              />
            </Search>
            </form>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="app-container" style={{ overflow: "hidden" }}>
      
      {isLyricsPage && (
  !isArtistSongsPage && (
    <TagList
      tags={tags}
      selectedTags={selectedTags}
      onSelectTag={handleTagSelect}
    />
  )
)}


        <Routes>
          <Route path="/lyric/:id" element={<LyricsPage lyrics={lyrics} showTags={false} />} />
          <Route
            path="/lyrics"
            element={<LyricsList lyrics={filteredSearch} showTags={true} />}
          />
          <Route
            path="/"
            element={
              selectedTags.length ? (
                <Navigate to="/lyrics" />
              ) : (
                <Navigate to="/lyrics" />
              )
            }
          />
          <Route
            path="/artist/:artistName"
            element={<ArtistSongsPage />}
            /* Pass the songs data as state */
            state={{ songs: lyrics }}
          />
        </Routes>
      </div></>
  );
};

export default App;
