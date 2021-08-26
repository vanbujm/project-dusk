/* eslint-disable @typescript-eslint/no-var-requires */
import { PlayerClassUniqueInput } from '../../generated/graphql';
const { getPrismaClient } = require('../../lib/prisma');

console.log('getPrismaClient');

const client = getPrismaClient();

export const resolvers = {
  Query: {
    narrations: ({ player, class: classInput }: PlayerClassUniqueInput) =>
      client.narration.findMany({
        where: { AND: [{ classes: { every: { ...classInput, player: { every: { ...player } } } } }] },
      }),
  },
};
