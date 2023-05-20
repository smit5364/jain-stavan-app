import React from 'react';
import { Link } from 'react-router-dom';

const LyricsList = ({ lyrics, currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="lyrics-list-container">
      <h2 className="lyrics-list-heading">Filtered Lyrics:</h2>
      {lyrics.map((lyric) => (
        <div className="lyrics-item" key={lyric.id}>
          <Link to={`/lyrics/${lyric.id}`} className="lyrics-link">
            <h3 className="lyrics-title">{lyric.title}</h3>
          </Link>
          <p className="lyrics-artist">Artist: {lyric.artist}</p>
          <p className="lyrics-tags">Tags: {lyric.tags.join(', ')}</p>
        </div>
      ))}

      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="pagination-button">
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="pagination-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default LyricsList;
