const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const cors = require("cors");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
// const schema = require("./gqlSchemaRes");

// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLList,
//   GraphQLInt,
//   GraphQLNonNull,
// } = require("graphql");

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

const VoteType = new GraphQLObjectType({
  name: "Vote",
  description: "Vote on a question or answer",
  fields: () => ({
    votevalue: { type: GraphQLNonNull(GraphQLInt) },
    type: { type: GraphQLNonNull(GraphQLString) }, // "question" or "answer"
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

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addQuestion: {
      type: QuestionType,
      description: "Add Question",
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        quest: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const quest = {
          id: ++questions.length,
          title: args.title,
          quest: args.quest,
        };
        questions.push(quest);
        return quest;
      },
    },

    addAnswer: {
      type: AnswerType,
      description: "Add Answer",
      args: {
        text: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const answer = {
          id: ++answers.length,
          text: args.title,
        };
        answers.push(answer);
        return answer;
      },
    },
    addVote: {
      type: VoteType,
      description: "Vote on a question or answer",
      args: {
        input: { type: GraphQLNonNull(GraphQLString) },
        voteValue: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, { input }) => {
        const { id, type, voteValue } = input;
        const targetArray = type === "question" ? questions : answers;
        const target = targetArray.find((item) => item.id === id);
        if (target) {
          target.vote += voteValue;
        }
      },
    },
  }),
});

const app = express();
app.use(cors());
const answers = [
  { id: 1, text: "ngrsjkd", vote: 5 },
  { id: 2, text: "rfgasd", vote: 2 },
  { id: 3, text: "sdfg", vote: 1 },
  { id: 4, text: "sgzfzdzdfdfzg", vote: 2 },
];
const questions = [
  { id: 1, title: "ghnjkrld", quest: "ngjklsdng", answersid: [2, 1], vote: 4 },
  { id: 2, title: "bsdfbfad", quest: "ewkl;es;", answersid: [3, 4], vote: 5 },
];

const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => console.log("running..."));
