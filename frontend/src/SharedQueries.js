import { gql } from "apollo-boost";

export const ME = gql`
  query {
    myProfile {
      username
    }
  }
`;
