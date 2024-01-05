import { useEffect } from "react";
import React from "react";
import "./App.css";
import ForumPost from "./components/ForumPost";
import answerPage from "./answerPage";
import { TEST, newQuest } from "./gqls";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
  useMutation,
} from "@apollo/client";
import QuestionForm from "./components/QuestionForm";

const graphqlEndpoint = "http://localhost:3000";

const client = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
});

function App() {
  const { loading, error, data } = useQuery(TEST);

  const [addQuestion] = useMutation(newQuest);

  // useEffect(() => {
  // if (!loading && data) {
  // const questions = data.questions;
  // }
  // }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("GraphQL Data:", data);
  const questions = data.questions;

  // if (!loading && data) {
  // const questions = data.questions;
  // }

  const handleQuestionSubmit = (formData) => {
    const input = {
      title: formData.title,
      quest: formData.quest,
    };
    console.log("Form Data:", formData);
    addQuestion({ variables: { input } })
      .then((result) => {
        console.log("question added successfully:", result.data);
      })
      .catch((err) => {
        console.error("Error adding question:", err.message);
      });
  };

  return (
    <>
      <h1>Mock forum</h1>
      <div>
        <QuestionForm onSubmit={handleQuestionSubmit} />
      </div>
      {questions &&
        questions.map((question) => (
          <ForumPost key={question.id} forumPost={question} />
        ))}
    </>
  );
}

function Root() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default Root;
