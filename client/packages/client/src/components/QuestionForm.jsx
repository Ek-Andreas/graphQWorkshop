import React, { useState } from "react";

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [quest, setText] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, quest });
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
        <textarea value={quest} onChange={handleTextChange} required />
      </label>
      <br />
      <button type="submit">Post Question</button>
    </form>
  );
};

export default QuestionForm;
