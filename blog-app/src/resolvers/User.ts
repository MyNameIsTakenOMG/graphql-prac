import { Context } from '..';

interface UserParentType {
  id: number;
}

export const User = {
  posts: async (parent: UserParentType, args: any, context: Context) => {
    const { prisma, userInfo } = context;
    const isOwnProfile = parent.id === userInfo?.userId;
    if (isOwnProfile) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
  },
};
