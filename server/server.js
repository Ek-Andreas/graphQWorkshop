const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const cors = require("cors");
const mongodb = require("mongodb");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");
const { MongoClient } = require("mongodb");

// const answers = [
//   { id: 1, text: "ngrsjkd", vote: 5 },
//   { id: 2, text: "rfgasd", vote: 2 },
//   { id: 3, text: "sdfg", vote: 1 },
//   { id: 4, text: "sgzfzdzdfdfzg", vote: 2 },
// ];
// const questions = [
//   { id: 1, title: "ghnjkrld", quest: "ngjklsdng", answersid: [2, 1], vote: 4 },
//   { id: 2, title: "bsdfbfad", quest: "ewkl;es;", answersid: [3, 4], vote: 5 },
// ];

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
        const answersIds = question.answersid || [];
        return answers.filter((answer) => answersIds.includes(answer.id));
      },
    },
  }),
});

const QuestionInputType = new GraphQLInputObjectType({
  name: "QuestionInput",
  description: "Input for Question",
  fields: () => ({
    title: { type: GraphQLNonNull(GraphQLString) },
    quest: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const VoteInputType = new GraphQLInputObjectType({
  name: "VoteInput",
  description: "Input for voting on a question or answer",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    type: { type: GraphQLNonNull(GraphQLString) }, // "question" or "answer"
    votevalue: { type: GraphQLNonNull(GraphQLInt) },
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
        input: { type: GraphQLNonNull(QuestionInputType) },
      },
      resolve: (_, { input }) => {
        const { title, quest } = input;
        const question = {
          id: questions.length + 1,
          title: title,
          quest: quest,
          vote: 0,
        };
        questions.push(question);
        insertQuestion(question);
        return question;
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
          text: args.text,
        };
        answers.push(answer);
        insertanswer(answer);
        return answer;
      },
    },
    addVote: {
      type: VoteType,
      description: "Vote on a question or answer",
      args: {
        input: { type: GraphQLNonNull(VoteInputType) },
      },
      resolve: (_, { input }) => {
        const { id, type, votevalue } = input;
        const targetArray = type === "question" ? questions : answers;
        const target = targetArray.find((item) => item.id === id);
        if (target) {
          target.vote = (target.vote || 0) + votevalue;
          updateVotes(target, VoteType, votevalue);
        }
        return { type, votevalue };
      },
    },
  }),
});
const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: RootMutationType,
});

const app = express();
app.use(cors());

//const database = client.db("test_db");
//const answers = database.collection('answers');
// Query for a movie that has the title 'Back to the Future'
//const query = { title: 'Back to the Future' };
//const movie = await movies.findOne(query);
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("mydb");
    coll = database.collection("answers");

    answers = await coll.find().toArray();

    coll = database.collection("questions");
    questions = await coll.find({}).toArray();
    // console.log(answers);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insertQuestion(quest) {
  try {
    const database = client.db("mydb");
    coll = database.collection("questions");
    coll.insert(quest);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function updateVotes(targettype, VoteType, votevalue) {
  try {
    const database = client.db("mydb");
    coll = database.collection(VoteType);
    coll.updateOne(
      { id: targettype.id },
      { $set: { vote: targettype.vote + votevalue } }
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insertanswer(answer) {
  try {
    const database = client.db("mydb");
    coll = database.collection("answers");
    coll.insert(answer);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
// console.log(await database.listCollections());

// coll = database.collection("questions");
// questions = coll.find({}).toArray();

app.use(
  "/",

  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

// async function run() {
//   try {
//     await client.connect();
//     //console.log(await client.db().admin().listDatabases());
//     const database = client.db("mydb");
//     // console.log(await database.listCollections());
//     const coll = database.collection("answers");
//     await coll.insertMany(answers);
//     // Query for a movie that has the title 'Back to the Future'
//     // const query = { title: "Back to the Future" };
//     // const movie = await movies.findOne(query);
//     // console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// adder();
app.listen(3000, () => console.log("running..."));
