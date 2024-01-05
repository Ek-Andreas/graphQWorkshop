import gql from "graphql-tag";
export const TEST = gql`
  query {
    questions {
      id
      title
      quest
      vote
      answers {
        id
        text
        vote
      }
    }
  }
`;

export const VOTE_ON = gql`
  mutation AddVote($input: VoteInput!) {
    addVote(input: $input) {
      type
      votevalue
    }
  }
`;

export const newQuest = gql`
  mutation addQuestion($input: QuestionInputType!) {
    addQuestion(input: $input) {
      title
      quest
    }
  }
`;
