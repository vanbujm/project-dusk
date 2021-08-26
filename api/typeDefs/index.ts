/* eslint-disable @typescript-eslint/no-var-requires */
const { gql } = require('apollo-server-micro');

export default gql`
  type Answer {
    id: ID!
    text: String!
    question: Narration
  }

  type Narration {
    id: ID!
    text: String!

    answer: Answer

    classes: [Class!]!
  }

  type Class {
    id: ID!
    name: String!

    sequence: [Narration!]!
    player: [Player!]!
  }

  type Player {
    id: ID!
    email: String!
    name: String!

    class: Class

    seenNarrations: [Narration!]!
    answeredQuestions: [Narration!]!
  }

  input PlayerUniqueInput {
    id: String
    email: String
    name: String
  }

  input ClassUniqueInput {
    id: String
    name: String
  }

  input PlayerClassUniqueInput {
    player: PlayerUniqueInput!
    class: ClassUniqueInput!
  }

  type Query {
    narrations(where: PlayerClassUniqueInput): [Narration!]!
  }
`;
