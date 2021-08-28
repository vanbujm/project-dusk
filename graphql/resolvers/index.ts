/* eslint-disable @typescript-eslint/no-var-requires */
import { ClassUniqueInput } from '../../generated/graphql';
const { getPrismaClient } = require('../../lib/prisma');

const client = getPrismaClient();

export const resolvers = {
  Query: {
    narrations(...args: any) {
      console.log('getting narrations', args);
      return {};
      // return client.narration.findMany({
      //   where: { AND: [{ classes: { every: { ...classInput, player: { every: { email: user.email } } } } }] },
      // });
    },
  },
};
