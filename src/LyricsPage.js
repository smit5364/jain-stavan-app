
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React from 'react';
import './tailwind.css'; // Import Tailwind CSS styles
import { useParams } from 'react-router-dom';

const LyricsPage = ({ lyrics }) => {
  const { id } = useParams();
  const lyric = lyrics.find((lyric) => lyric.id === parseInt(id));

  if (!lyric) {
    return <div className="lyrics-page">Lyrics not found.</div>;
  }

  return (
    <div className="lyrics-page">
      <h2 className="lyrics-title">{lyric.title}</h2>
      <p className="lyrics-artist">Artist: {lyric.artist}</p>
      <p className="lyrics-tags">Tags: {lyric.tags.join(", ")}</p>
      <div className="lyrics-content">
        {lyric.content.split('\n').map((line, index) => (
          <p key={index} className="lyrics-line">{line}</p>
        ))}
      </div>
    </div>
  );
};


export default LyricsPage;
