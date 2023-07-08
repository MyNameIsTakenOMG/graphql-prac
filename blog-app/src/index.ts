import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { Mutation, Query } from './resolvers';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;
}

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req, res }) => ({
      prisma: prisma,
    }),
  });
  console.log(`🚀  Server ready at: ${url}`);
};
start();
