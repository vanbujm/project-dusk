/* eslint-disable @typescript-eslint/no-var-requires */
import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
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

  type Query {
    narrations(where: ClassUniqueInput!): [Narration!]!
  }
`;
