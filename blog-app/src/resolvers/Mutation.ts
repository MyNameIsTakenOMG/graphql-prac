import { Post } from '@prisma/client';
import { Context } from '../index';

interface PostCreateArgs {
  title: string;
  content: string;
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    parent: any,
    args: PostCreateArgs,
    context: Context
  ): Promise<PostPayloadType> => {
    const prisma = context.prisma;
    const { title, content } = args;
    // validation
    if (!title || !content) {
      return {
        userErrors: [{ message: 'title or content is required' }],
        post: null,
      };
    }
    // or create and return the new post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
    return {
      userErrors: [],
      post: post,
    };
  },
};
