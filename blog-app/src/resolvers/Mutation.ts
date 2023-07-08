import { Post } from '@prisma/client';
import { Context } from '../index';

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
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
    args: PostArgs,
    context: Context
  ): Promise<PostPayloadType> => {
    const prisma = context.prisma;
    const { title, content } = args.post;
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
  postUpdate: async (
    parent: any,
    { postId, post }: { postId: string; post: PostArgs['post'] },
    context: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title && !content) {
      return {
        userErrors: [{ message: 'title or content is required' }],
        post: null,
      };
    }
    const { prisma } = context;
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!existingPost) {
      return {
        userErrors: [{ message: 'post not found' }],
        post: null,
      };
    }
    let payloadToUpdate = {
      title,
      content,
    };
    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;
    return {
      userErrors: [],
      post: await prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(postId),
        },
      }),
    };
  },
  postDelete: async (
    parent: any,
    { postId }: { postId: string },
    context: Context
  ): Promise<PostPayloadType> => {
    const { prisma } = context;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!post)
      return {
        userErrors: [{ message: 'post not found' }],
        post: null,
      };
    await prisma.post.delete({ where: { id: Number(postId) } });
    return {
      userErrors: [],
      post: post,
    };
  },
};
