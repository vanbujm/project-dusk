import { QueryResolvers, Resolvers } from '../../../generated/graphql';
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
  narrations: async (parent, { where }, { user }) => {
    try {
      return await client.narration.findMany({
        where: {
          OR: [
            { classes: { every: { ...(where as any), player: { every: { email: user.email } } } } },
            { classes: { every: { ...(where as any), player: undefined } } },
          ],
        },
      });
    } catch (e) {
      console.error('db error:', e);
      throw e;
    }
  },
};

export const resolvers: Resolvers<ValidatedContext> = {
  Query: queryResolvers,
};
