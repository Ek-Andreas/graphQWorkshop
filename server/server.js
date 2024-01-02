const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();
const answers = [
  { id: 1, text: "ngrsjkd" },
  { id: 2, text: "rfgasd" },
  { id: 3, text: "sdfg" },
  { id: 4, text: "sgzfzdzdfdfzg" },
];
const questions = [
  { id: 1, title: "ghnjkrld", quest: "ngjklsdng", answersid: [2, 1], vote: 4 },
  { id: 2, title: "bsdfbfad", quest: "ewkl;es;", answersid: [3, 4], vote: 5 },
];

const QuestionType = new GraphQLObjectType({
  name: "Question",
  description: "questions",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    vote: { type: GraphQLNonNull(GraphQLInt) },

    title: { type: GraphQLNonNull(GraphQLString) },
    quest: { type: GraphQLNonNull(GraphQLString) },
    answersid: { type: GraphQLList(GraphQLInt) },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve: (question) => {
        return answers.filter((answer) =>
          question.answersid.includes(answer.id)
        );
      },
    },
  }),
});

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  description: "Answer",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    vote: { type: GraphQLNonNull(GraphQLInt) },
    text: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const rootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root Query",
  fields: () => ({
    questions: {
      type: new GraphQLList(QuestionType),
      description: "list of all questions",
      resolve: () => questions,
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQueryType,
});

app.use(
  "/",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => console.log("running..."));
