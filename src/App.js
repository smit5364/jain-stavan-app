import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './tailwind.css';
import TagList from './TagList';
import LyricsList from './LyricsList';
import LyricsPage from './LyricsPage';

const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredLyrics, setFilteredLyrics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); 

const tags = ['Pop', 'Rock', 'Rap', 'Love', 'Dance', 'Summer', 'Empowerment', 'Urban'];
  const lyrics = [
  
    { id: 2, title: 'Song 2', artist: 'Artist 2', tags: ['Rock'], content: 'Lyrics for Song 2' },
    { id: 3, title: 'Song Smit 3', artist: 'Artist 3', tags: ['Rap','Rock'], content: 'Lyrics Song 3' },
    { id: 4, title: 'Song 4', artist: 'Artist 4', tags: ['Rap','Pop'], content: 'Lyrics for Song 4' },
    { id: 5, title: 'Song 5', artist: 'Artist 5', tags: ['Rap'], content: 'Lyrics for Song 5' },
    { id: 6, title: 'Love Song', artist: 'Artist 6', tags: ['Pop', 'Love'], content: 'Im lost in your eyes, cant find my way back home' },
    { id: 7, title: 'Dance All Night', artist: 'Artist 7', tags: ['Pop', 'Dance'], content: 'Lets dance all night, until the morning light' },
    { id: 8, title: 'Sunset Dreams', artist: 'Artist 8', tags: ['Pop', 'Summer'], content: 'Underneath the golden sky, we chase our dreams tonight' },
    { id: 9, title: 'Break the Chains', artist: 'Artist 9', tags: ['Rock', 'Empowerment'], content: 'Break the chains that bind, rise up and take your stand' },
    { id: 10, title: 'City Streets', artist: 'Artist 10', tags: ['Rock', 'Urban'], content: 'In the city streets, where dreams and nightmares meet' },
    { id: 11, title: 'Rhythm and Flow', artist: 'Artist 11', tags: ['Rap', 'Groove'], content: 'Feel the rhythm, let it flow, let your true colors show' },
    { id: 12, title: 'Unstoppable', artist: 'Artist 12', tags: ['Rap', 'Motivation'], content: 'Im unstoppable, watch me rise, I wont be compromised' },
    { id: 13, title: 'Serenade', artist: 'Artist 13', tags: ['Pop', 'Romance'], content: 'In the moonlighs gentle glow, I sing this serenade for you' },
    { id: 14, title: 'Freedom Song', artist: 'Artist 14', tags: ['Rock', 'Freedom'], content: 'Well sing the freedom song, together we are strong' },
    { id: 15, title: 'Rhyme Master', artist: 'Artist 15', tags: ['Rap', 'Skill'], content: 'Im the rhyme master, words flow faster, Im the ultimate disaster' }
  ];

  useEffect(() => {
    const filtered = lyrics.filter((lyric) =>
    selectedTags.every((selectedTag) => lyric.tags.includes(selectedTag))
    );
    setFilteredLyrics(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / perPage));
    }, [selectedTags, lyrics, perPage]);
    
    const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
    setSelectedTags([...selectedTags, tag]);
    }
    };
    
    const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    };
    
    const filteredSearch = filteredLyrics.filter(
    (lyric) =>
    lyric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lyric.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    lyric.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Update navigation to the new page
    navigate(`/lyrics?page=${pageNumber}`); // Update navigation to the new page
    };
    
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentLyrics = filteredSearch.slice(firstIndex, lastIndex);
    
    return (
    <Router>
    <div className="app-container">
    <h1 className="app-title">
    <Link to="/lyrics">Song Lyrics App</Link>
    </h1>
    <div className="search-bar">
    <input
    type="text"
    placeholder="Search"
    value={searchQuery}
    onChange={handleSearch}
    className="search-input"
    />
    </div>
    <TagList tags={tags} selectedTags={selectedTags} onSelectTag={handleTagSelect} />
    <Routes>
    <Route path="/lyrics/:id" element={<LyricsPage lyrics={lyrics} />} />
    <Route
    path="/lyrics"
    element={
    <LyricsList
    lyrics={currentLyrics}
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
    />
    }
    />
    <Route path="/" element={selectedTags.length ? <Navigate to="/lyrics" /> : null} />
    </Routes>
    </div>
    </Router>
    );
    };
    
    export default App;