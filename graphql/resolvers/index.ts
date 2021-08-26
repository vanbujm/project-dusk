/* eslint-disable @typescript-eslint/no-var-requires */
import { ClassUniqueInput } from '../../generated/graphql';
const { getPrismaClient } = require('../../lib/prisma');

console.log('getPrismaClient');

const client = getPrismaClient();

export const resolvers = {
  Query: {
    narrations(classInput: ClassUniqueInput, { user, ...rest }: any) {
      console.log('getting narrations', classInput);
      console.log(user, rest);
      return client.narration.findMany({
        where: { AND: [{ classes: { every: { ...classInput, player: { every: { email: user.email } } } } }] },
      });
    },
  },
};
