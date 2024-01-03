import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { useQuery, useMutation } from "@apollo/client";
// import gql from "graphql-tag";

import viteLogo from "/vite.svg";
import "./App.css";
const app = express();
const graphqlEndpoint = "";

function App() {
  const client = new ApolloClient({
    uri: graphqlEndpoint,
    cache: new InMemoryCache(),
  });

  const { loading, error, data } = useQuery(GET_ALL_FORUM_POSTS);
  const serverPort = 3000;
  client
    .query({
      query: GET_USERS,
    })
    .then((result) => {
      const data = result.data; // Extract the data from the result
      console.log("GraphQL Data:", data);
    })
    .catch((error) => {
      console.error("GraphQL Error:", error);
    });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
