import React from "react";
import Answer from "./answer";
import { useMutation } from "@apollo/client";
import { VOTE_ON } from "../gqls";
import { Link } from "react-router-dom";

const ForumPost = ({ forumPost }) => {
  if (!forumPost) {
    return null;
  }
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
        forumPost.vote + votevalue;
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

      <h3>Best Answer:</h3>
      <ul>
        {forumPost.answers && forumPost.answers.length > 0 && (
          <Answer
            key={
              forumPost.answers.reduce((max, answer) =>
                answer.vote > max.vote ? answer : max
              ).id
            }
            answer={forumPost.answers.reduce((max, answer) =>
              answer.vote > max.vote ? answer : max
            )}
          />
        )}
      </ul>

      {/* <h3>Answers:</h3>
      <ul>
        {forumPost.answers &&
          forumPost.answers.map((answer) => (
            <Answer key={answer.id} answer={answer} />
          ))}
      </ul> */}
    </div>
  );
};

export default ForumPost;
