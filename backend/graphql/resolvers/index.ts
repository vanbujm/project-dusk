/* eslint-disable @typescript-eslint/no-var-requires */
import { QueryResolvers } from '../../../generated/graphql';
import { getPrismaClient } from '../../lib/prisma';

const client = getPrismaClient();

export type UserInfo = {
  email: string;
};

export type Context = {
  user?: UserInfo;
};

export type ValidatedContext = Required<Context>;

const queryResolvers: QueryResolvers<ValidatedContext> = {
  narrations: (parent, { where }, { user }) =>
    client.narration.findMany({
      where: { AND: [{ classes: { every: { ...(where as any), player: { every: { email: user.email } } } } }] },
    }) as any,
};

export const resolvers = {
  Query: queryResolvers,
};
