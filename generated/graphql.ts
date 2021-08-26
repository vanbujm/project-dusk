import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  text: Scalars['String'];
  question?: Maybe<Narration>;
};

export type Class = {
  __typename?: 'Class';
  id: Scalars['ID'];
  name: Scalars['String'];
  sequence: Array<Narration>;
  player: Array<Player>;
};

export type ClassUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Narration = {
  __typename?: 'Narration';
  id: Scalars['ID'];
  text: Scalars['String'];
  answer?: Maybe<Answer>;
  classes: Array<Class>;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  class?: Maybe<Class>;
  seenNarrations: Array<Narration>;
  answeredQuestions: Array<Narration>;
};

export type PlayerClassUniqueInput = {
  player: PlayerUniqueInput;
  class: ClassUniqueInput;
};

export type PlayerUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  narrations: Array<Narration>;
};

export type QueryNarrationsArgs = {
  where?: Maybe<PlayerClassUniqueInput>;
};

export type GetIntroNarrationQueryVariables = Exact<{ [key: string]: never }>;

export type GetIntroNarrationQuery = {
  __typename?: 'Query';
  narrations: Array<{ __typename?: 'Narration'; id: string; text: string }>;
};

export const GetIntroNarrationDocument = gql`
  query GetIntroNarration {
    narrations(where: { class: { name: "test" }, player: { name: "test" } }) {
      id
      text
    }
  }
`;

/**
 * __useGetIntroNarrationQuery__
 *
 * To run a query within a React component, call `useGetIntroNarrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIntroNarrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIntroNarrationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIntroNarrationQuery(
  baseOptions?: Apollo.QueryHookOptions<GetIntroNarrationQuery, GetIntroNarrationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetIntroNarrationQuery, GetIntroNarrationQueryVariables>(GetIntroNarrationDocument, options);
}
export function useGetIntroNarrationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetIntroNarrationQuery, GetIntroNarrationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetIntroNarrationQuery, GetIntroNarrationQueryVariables>(
    GetIntroNarrationDocument,
    options
  );
}
export type GetIntroNarrationQueryHookResult = ReturnType<typeof useGetIntroNarrationQuery>;
export type GetIntroNarrationLazyQueryHookResult = ReturnType<typeof useGetIntroNarrationLazyQuery>;
export type GetIntroNarrationQueryResult = Apollo.QueryResult<GetIntroNarrationQuery, GetIntroNarrationQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
