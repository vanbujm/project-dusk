/* eslint-disable @typescript-eslint/no-var-requires */
import { QueryResolvers } from '../../generated/graphql';
const { getPrismaClient } = require('../../lib/prisma');

const client = getPrismaClient();

type UserInfo = {
  email: string;
};

type Context = {
  user?: UserInfo;
};

const queryResolvers: QueryResolvers<Context> = {
  narrations: (parent, { where }, { user }) => {
    if (!where.name && !where.id) {
      throw new Error('narrations query requires either id or name');
    }
    if (!user) {
      throw new Error('You must be authenticated');
    }
    return client.narration.findMany({
      where: { AND: [{ classes: { every: { ...where, player: { every: { email: user.email } } } } }] },
    });
  },
};

export const resolvers = {
  Query: queryResolvers,
};
