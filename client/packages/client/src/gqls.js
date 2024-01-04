import gql from "graphql-tag";
export const TEST = gql`
  query {
    questions {
      title
      quest
      vote
      answers {
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
      id
      vote
    }
  }
`;
