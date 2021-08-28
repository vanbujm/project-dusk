/* eslint-disable @typescript-eslint/no-var-requires */
import { QueryResolvers } from '../../generated/graphql';
const { getPrismaClient } = require('../../lib/prisma');

const client = getPrismaClient();

type UserInfo = {
  email?: string;
};

const queryResolvers: QueryResolvers<UserInfo> = {
  narrations: (parent, { where }, context) => {
    if (!where.name && !where.id) {
      throw new Error('narrations query requires either id or name');
    }
    if (!context.email) {
      throw new Error('You must be authenticated');
    }
    return client.narration.findMany({
      where: { AND: [{ classes: { every: { ...where, player: { every: { email: context.email } } } } }] },
    });
  },
};

export const resolvers = {
  Query: queryResolvers,
};
