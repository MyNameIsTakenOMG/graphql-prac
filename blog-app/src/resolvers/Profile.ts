import { Context } from '..';

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (parent: ProfileParentType, args: any, context: Context) => {
    const { prisma, userInfo } = context;
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
