import { Context } from '..';

export const Query = {
  posts: async (parent: any, args: any, context: Context) => {
    const prisma = context.prisma;
    return await prisma.post.findMany({
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
};
