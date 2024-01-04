import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { VOTE_ON } from "../gqls";

const Answer = ({ answer }) => {
  const [addVote] = useMutation(VOTE_ON);

  const handleVote = (voteValue) => {
    const input = {
      id: answer.id,
      type: "answer",
      voteValue: voteValue,
    };

    addVote({ variables: { input } });
  };
  return (
    <li>
      <p>{answer.text}</p>
      <div>
        <strong>votes:</strong> {answer.vote}
        <div>
          <button onClick={() => handleVote(1)}>+</button>
          <button onClick={() => handleVote(-1)}>-</button>
        </div>
      </div>
    </li>
  );
};

export default Answer;
