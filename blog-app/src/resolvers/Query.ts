import { Context } from '..';

export const Query = {
  posts: async (parent: any, args: any, context: Context) => {
    const prisma = context.prisma;
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
  me: async (parent: any, args: any, context: Context) => {
    const { prisma, userInfo } = context;
    if (!userInfo) return null;
    else
      return await prisma.user.findUnique({
        where: {
          id: userInfo.userId,
        },
      });
  },
  profile: async (parent: any, args: { userId: string }, context: Context) => {
    const { prisma } = context;
    const { userId } = args;
    return await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });
  },
};
