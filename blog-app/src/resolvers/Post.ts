import { Context } from '..';
import { userLoader } from '../loaders/userLoader';

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: async (parent: PostParentType, args: any, context: Context) => {
    const { prisma, userInfo } = context;
    // return await prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId,
    //   },
    // });
    return await userLoader.load(parent.authorId);
  },
};
