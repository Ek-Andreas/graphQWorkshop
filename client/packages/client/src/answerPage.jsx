import React from "react";
import Answer from "./components/answer";
import { useMutation } from "@apollo/client";
import { VOTE_ON } from "./gqls";

const answerPage = ({ id }) => {
  if (!id) {
    return null;
  }

  const forumPost = {
    /* Fetch the question by id */
  };
  const answers = {
    /* Fetch the answers associated with the question by id */
  };

  const [addVote] = useMutation(VOTE_ON);

  const handleVote = (votevalue) => {
    const input = {
      id: forumPost.id,
      type: "question",
      votevalue: votevalue,
    };
    console.log(input);
    //addVote({ variables: { input } });
    addVote({ variables: { input } })
      .then((response) => {
        const { type, vote } = response.data.addVote;
        console.log("Mutation Response:", { type, vote });
      })
      .catch((error) => {
        console.error("Mutation Error:", error.message);
      });
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

      <h3>Answers:</h3>
      <ul>
        {forumPost.answers &&
          forumPost.answers.map((answer) => (
            <Answer key={answer.id} answer={answer} />
          ))}
      </ul>
    </div>
  );
};

export default answerPage;
