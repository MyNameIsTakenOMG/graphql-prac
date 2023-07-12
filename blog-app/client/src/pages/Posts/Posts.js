import React from 'react';
import Post from '../../components/Post/Post';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <div>error page</div>;
  }
  if (loading) return <div>loading...</div>;

  const { posts } = data;
  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            date={post.createdAt}
            title={post.title}
            content={post.content}
            published={post.published}
            user={post.user.name}
          />
        );
      })}
    </div>
  );
}
