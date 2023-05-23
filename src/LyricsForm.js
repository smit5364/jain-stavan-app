import React, { useState } from 'react';
import { firestore } from './firebaseConfig';

const LyricsForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split the tags string into an array
    const tagsArray = tags.split(',');

    // Save the song data to Firestore
    firestore.collection('lyrics').add({
      title,
      artist,
      tags: tagsArray,
      content,
    })
      .then(() => {
        // Reset the form fields
        setTitle('');
        setArtist('');
        setTags('');
        setContent('');
        console.log('Song data added to Firestore.');
      })
      .catch((error) => {
        console.error('Error adding song data to Firestore:', error);
      });
  };

  return (
    <div>
      <h2>Add Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Artist:</label>
          <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default LyricsForm;
