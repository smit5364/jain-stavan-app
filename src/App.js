import React, { useState, useEffect, useCallback } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import TagList from "./TagList";
import LyricsList from "./LyricsList";
import LyricsPage from "./LyricsPage";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";

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
import { Public } from "@mui/icons-material";

const firebaseConfig = {
  apiKey: "AIzaSyAbYromvE1yC-8NSJslfh76nG08qKbMXdk",
  authDomain: "jain-stavan-86cb6.firebaseapp.com",
  databaseURL: "https://jain-stavan-86cb6-default-rtdb.firebaseio.com",
  projectId: "jain-stavan-86cb6",
  storageBucket: "jain-stavan-86cb6.appspot.com",
  messagingSenderId: "285813640279",
  appId: "1:285813640279:web:ab619d720373a0369b6712",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

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
  marginBottom: "2px",
  fontSize: "14px",
  color: "black",
  fontStyle: "bold",
});

const LyricsTags = styled(Typography)({
  marginTop: "0px",
  fontSize: "10px",
  color: ({ theme }) => theme.palette.text.secondary,
});

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

const ArtistSongsPage = ({}) => {
  const { artistName } = useParams();
  const [lyrics, setLyrics] = useState([]);
  const artistSongs = lyrics;

  console.log("Artist:", artistName);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const snapshot = await db.collection("tags").get();
        const fetchedTags = snapshot.docs.map((doc) => doc.data().name);
        setTags(fetchedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const lyricsRef = db.collection("lyrics");
        const snapshot = await lyricsRef.get();
        const fetchedLyrics = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLyrics(fetchedLyrics);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    fetchLyrics();
  }, []);

  const filteredSongsByArtist = artistSongs.filter(
    (lyrics) => lyrics.artist.toLowerCase() === artistName.toLowerCase()
  );

  const handleSongClick = (songId) => {
    navigate(`/lyrics/${songId}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
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
                Jain Dhun
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
      <LyricsListContainer  >
      <Typography variant="h4" component="h2" style={{ marginBottom: "20px" }}>
          Songs by {artistName}
        </Typography>
        {filteredSongsWithSearchAndTags.map((lyrics) => (
          <LyricsLink style={{height:"40px",}} to={`/lyric/${lyrics.id}`} key={lyrics.id}>
          <div style={{ position: "relative" }}>
            <LyricsID variant="body1" component="span">
              {lyrics.numbering}
            </LyricsID>
            <LyricsContent>
              <LyricsTitle variant="h5" component="h3">
                {lyrics.title}
              </LyricsTitle>
              <Typography style={{fontSize:"11px"}}>{lyrics.content.split("\n")[0]}</Typography>
            </LyricsContent>
          </div>
        </LyricsLink>
        ))}
      </LyricsListContainer>
    </div>
  );
};

const HamburgerMenu = styled("div")(({ isOpen }) => ({
  display: isOpen ? "block" : "none",
  // Add your styles for the hamburger menu here
}));

const App = () => {
  const [filterData, setFilterData] = useState({
    selectedTags: [],
    filteredLyrics: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isArtistSongsPage = location.pathname.includes("/artist/");
  const isLyricsPage = location.pathname.includes("lyrics");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lyrics, setLyrics] = useState([]);
  const [tags, setTags] = useState([]);

  const { selectedTags, filteredLyrics } = filterData;

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const lyricsRef = db.collection("lyrics");
        const snapshot = await lyricsRef.get();
        const fetchedLyrics = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLyrics(fetchedLyrics);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    fetchLyrics();
  }, []);

  useEffect(() => {
    const filtered = lyrics.filter((lyric) =>
      selectedTags.every((selectedTag) => lyric.tags.includes(selectedTag))
    );

    const filteredSearch = filtered.filter(
      (lyric) =>
        lyric.numbering.toString().includes(searchQuery) || // Search by numbering
        lyric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lyric.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        lyric.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    

    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      filteredLyrics: filteredSearch,
    }));
  }, [lyrics, selectedTags, searchQuery]);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const snapshot = await db.collection("tags").get();
        const fetchedTags = snapshot.docs.map((doc) => doc.data().name);
        setTags(fetchedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      navigate(`/lyrics?search=${encodeURIComponent(searchQuery)}`);
    },
    [navigate, searchQuery]
  );

  const handleTagSelect = useCallback(
    (tag) => {
      setFilterData((prevFilterData) => {
        const { selectedTags: prevSelectedTags } = prevFilterData;
        if (prevSelectedTags.includes(tag)) {
          return {
            ...prevFilterData,
            selectedTags: prevSelectedTags.filter(
              (selectedTag) => selectedTag !== tag
            ),
          };
        } else {
          return {
            ...prevFilterData,
            selectedTags: [...prevSelectedTags, tag],
          };
        }
      });
    },
    []
  );

  const handleLogoClick = useCallback(() => {
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      selectedTags: [],
    }));
    setSearchQuery("");
  }, []);

  let routesElement;
  if (isLyricsPage && !isArtistSongsPage) {
    routesElement = (
      <div style={{ marginTop: 10 }}>
        <button style={{ border: 0 }} onClick={handleMenuToggle}>
          <MenuIcon />
        </button>
        <HamburgerMenu isOpen={isMenuOpen}>
          <TagList
            tags={tags}
            selectedTags={selectedTags}
            onSelectTag={handleTagSelect}
          />
        </HamburgerMenu>
      </div>
    );
  }

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
                textDecoration: "none",
              }}
            >
              <Link
                to="/lyrics"
                onClick={handleLogoClick}
                style={{ color: "white", textDecoration: "none" }}
              >
                Jain Dhun
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
        {routesElement}

        <Routes>
          <Route
            path="/lyric/:id"
            element={<LyricsPage lyrics={lyrics} showTags={false} />}
          />
          <Route
            path="/lyrics"
            element={<LyricsList lyrics={filteredLyrics} showTags={true} />}
          />
          <Route path="/" element={<Navigate to="/lyrics" />} />
          <Route
            path="/artist/:artistName"
            element={<ArtistSongsPage />}
            state={{ songs: lyrics }}
          />
        </Routes>
      </div>
    </>
  );
};



export default App;
