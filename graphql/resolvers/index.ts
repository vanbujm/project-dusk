/* eslint-disable @typescript-eslint/no-var-requires */
import { QueryResolvers } from '../../generated/graphql';
const { getPrismaClient } = require('../../lib/prisma');

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
      where: { AND: [{ classes: { every: { ...where, player: { every: { email: user.email } } } } }] },
    }),
};

export const resolvers = {
  Query: queryResolvers,
};
