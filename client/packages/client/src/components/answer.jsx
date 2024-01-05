import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { VOTE_ON } from "../gqls";

const Answer = ({ answer }) => {
  const [addVote, { error }] = useMutation(VOTE_ON);

  const handleVote = (votevalue) => {
    const input = {
      id: answer.id,
      type: "answer",
      votevalue: votevalue,
    };
    console.log(input);
    addVote({ variables: { input } })
      .then((result) => {
        console.log("Vote added successfully:", result.data);
        answer.vote + votevalue;
      })
      .catch((err) => {
        console.error("Error adding vote:", err.message);
      });
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
