import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { Mutation, Query, Profile, Post, User } from './resolvers';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';
import { getUserFromToken } from './utils/getUserFromToken';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
  },
});

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;
  userInfo: {
    userId: number;
    email: string;
  } | null;
}

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req, res }: any): Promise<Context> => {
      const userInfo = getUserFromToken(req.headers.authorization);
      return {
        prisma,
        userInfo,
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
start();
