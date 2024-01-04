import React from "react";
import Answer from "./answer";
import { useMutation } from "@apollo/client";
import { VOTE_ON } from "../gqls";

const ForumPost = ({ forumPost }) => {
  if (!forumPost) {
    return null;
  }
  const [addVote] = useMutation(VOTE_ON);

  const handleVote = (voteValue) => {
    const input = {
      id: forumPost.id,
      type: "question",
      voteValue: voteValue,
    };

    addVote({ variables: { input } });
  };
  return (
    <div>
      <h2>{forumPost.title}</h2>
      <div>
        <button onClick={() => handleVote(1)}>↑</button>
        <strong>votes:</strong> {forumPost.vote}
        <button onClick={() => handleVote(-1)}>↓</button>
        <strong> {forumPost.quest}</strong>
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
