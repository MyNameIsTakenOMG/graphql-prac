import { Post } from '@prisma/client';
import { Context } from '../../index';
import { canUserMutatePost } from '../../utils/canUserMutatePost';

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

export const postResolvers = {
  postCreate: async (
    parent: any,
    args: PostArgs,
    context: Context
  ): Promise<PostPayloadType> => {
    const { prisma, userInfo } = context;
    const { title, content } = args.post;
    // if user is signed in
    if (!userInfo) {
      return {
        userErrors: [{ message: 'not authenticated' }],
        post: null,
      };
    }
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
        authorId: userInfo.userId,
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
    const { prisma, userInfo } = context;
    // if user is signed in
    if (!userInfo) {
      return {
        userErrors: [{ message: 'not authenticated' }],
        post: null,
      };
    }
    // if the user is the author of the post
    const err = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (err) {
      return err;
    }

    if (!title && !content) {
      return {
        userErrors: [{ message: 'title or content is required' }],
        post: null,
      };
    }
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
    const { prisma, userInfo } = context;
    // if user is signed in
    if (!userInfo) {
      return {
        userErrors: [{ message: 'not authenticated' }],
        post: null,
      };
    }
    // if the user is the author of the post
    const err = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (err) {
      return err;
    }

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
  postPublish: async (
    parent: any,
    args: { postId: string },
    context: Context
  ): Promise<PostPayloadType> => {
    const { prisma, userInfo } = context;
    const { postId } = args;
    // if user is signed in
    if (!userInfo) {
      return {
        userErrors: [{ message: 'not authenticated' }],
        post: null,
      };
    }
    // if the user is the author of the post
    const err = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (err) {
      return err;
    }
    return {
      userErrors: [],
      post: await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          published: true,
        },
      }),
    };
  },
  postUnPublish: async (
    parent: any,
    args: { postId: string },
    context: Context
  ): Promise<PostPayloadType> => {
    const { prisma, userInfo } = context;
    const { postId } = args;
    // if user is signed in
    if (!userInfo) {
      return {
        userErrors: [{ message: 'not authenticated' }],
        post: null,
      };
    }
    // if the user is the author of the post
    const err = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (err) {
      return err;
    }
    return {
      userErrors: [],
      post: await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          published: false,
        },
      }),
    };
  },
};
