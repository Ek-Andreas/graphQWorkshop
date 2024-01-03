import React, { useState } from "react";

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the form data
    onSubmit({ title, text });
    // Clear the form fields
    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <br />
      <label>
        Text:
        <textarea value={text} onChange={handleTextChange} required />
      </label>
      <br />
      <button type="submit">Post Question</button>
    </form>
  );
};

export default QuestionForm;
