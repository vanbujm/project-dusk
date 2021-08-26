import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export const getPrismaClient = () => {
  if (!prisma) {
    console.log('creating prisma client...');
    prisma = new PrismaClient();
    console.log('prisma client created');
  }
  return prisma;
};
