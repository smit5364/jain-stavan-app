import React from 'react';
import './tailwind.css'; // Import Tailwind CSS styles


const TagList = ({ tags, selectedTags, onSelectTag }) => {
  return (
    <div className="tag-list">
      <h2>Filter by Tag:</h2>
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};



export default TagList;
