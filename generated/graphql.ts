import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
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
  where: ClassUniqueInput;
};

export type GetIntroNarrationQueryVariables = Exact<{ [key: string]: never }>;

export type GetIntroNarrationQuery = {
  __typename?: 'Query';
  narrations: Array<{ __typename?: 'Narration'; id: string; text: string }>;
};

export const GetIntroNarrationDocument = gql`
  query GetIntroNarration {
    narrations(where: { name: "test" }) {
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<Answer>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Class: ResolverTypeWrapper<Class>;
  ClassUniqueInput: ClassUniqueInput;
  Narration: ResolverTypeWrapper<Narration>;
  Player: ResolverTypeWrapper<Player>;
  PlayerUniqueInput: PlayerUniqueInput;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Class: Class;
  ClassUniqueInput: ClassUniqueInput;
  Narration: Narration;
  Player: Player;
  PlayerUniqueInput: PlayerUniqueInput;
  Query: {};
  Boolean: Scalars['Boolean'];
};

export type AnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  question?: Resolver<Maybe<ResolversTypes['Narration']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Class'] = ResolversParentTypes['Class']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sequence?: Resolver<Array<ResolversTypes['Narration']>, ParentType, ContextType>;
  player?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NarrationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Narration'] = ResolversParentTypes['Narration']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  answer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes['Class']>, ParentType, ContextType>;
  seenNarrations?: Resolver<Array<ResolversTypes['Narration']>, ParentType, ContextType>;
  answeredQuestions?: Resolver<Array<ResolversTypes['Narration']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  narrations?: Resolver<
    Array<ResolversTypes['Narration']>,
    ParentType,
    ContextType,
    RequireFields<QueryNarrationsArgs, 'where'>
  >;
};

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  Class?: ClassResolvers<ContextType>;
  Narration?: NarrationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
