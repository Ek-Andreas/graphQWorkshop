import React from "react";
import Answer from "./answer";

const ForumPost = ({ forumPost }) => {
  if (!forumPost) {
    return null;
  }

  return (
    <div>
      <h2>{forumPost.title}</h2>
      <p>{forumPost.text}</p>
      <div>
        <strong>Upvotes:</strong> {forumPost.upvotes}{" "}
        <strong>Downvotes:</strong> {forumPost.downvotes}
      </div>

      <h3>Answers:</h3>
      <ul>
        {forumPost.answers.map((answer) => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </ul>
    </div>
  );
};

export default ForumPost;
