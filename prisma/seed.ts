import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

export const seed = async () => {
  await client.narration.create({
    data: {
      text: 'Oh... I have awoken...',
    },
  });

  await client.$disconnect();
};
