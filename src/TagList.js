import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { firestore } from "./firebase";

const TagButton = styled("button")(({ theme, selected }) => ({
  marginRight: "8px",
  marginBottom: "8px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "20px",
  background: selected ? theme.palette.primary.main : "#f0f0f0",
  color: selected ? theme.palette.common.white : "#333",
  fontWeight: selected ? "bold" : "normal",
  cursor: "pointer",
  transition: "background 0.3s ease",
  "&:hover": {
    background: selected
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  },
}));

const TagList = ({ tags, selectedTags, onSelectTag }) => {
  return (
    <div style={{ margin: "10px 0" }}>
      {tags.map((tag, index) => (
        <TagButton
          selected={selectedTags.includes(tag)}
          onClick={() => onSelectTag(tag)}
          key={index}
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </TagButton>
      ))}
    </div>
  );
};


export default TagList;
