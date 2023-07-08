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
};
