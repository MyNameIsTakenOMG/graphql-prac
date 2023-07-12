import React, { useState } from 'react';
import './Post.css';
import { gql, useMutation } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    postDelete(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $title: String!, $content: String!) {
    postUpdate(postId: $postId, post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;
const UNPUBLISH_POST = gql`
  mutation PostUnPublish($postId: ID!) {
    postUnPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const formatedDate = new Date(Number(date));

  const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [unpublishPost, { data: unpublish_data, loading: unpublish_loading }] =
    useMutation(UNPUBLISH_POST);

  const [deletePost, { data: delete_data, loading: delete_loading }] =
    useMutation(DELETE_POST);

  const [toggle_update, setToggle_update] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [updatePost, { data: update_data, loading: update_loading }] =
    useMutation(UPDATE_POST);

  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: 'hotpink' } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() => {
            publishPost({
              variables: {
                postId: id,
              },
            });
          }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => {
            unpublishPost({
              variables: {
                postId: id,
              },
            });
          }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(' ').splice(0, 3).join(' ')} by{' '}
          {user}
        </h4>
      </div>
      <p>{content}</p>

      {/* update post  */}
      <button
        onClick={() => {
          setToggle_update(!toggle_update);
        }}
      >
        toggle_update
      </button>
      {toggle_update && (
        <div className="Post_update-form">
          <form>
            <label htmlFor="title">title</label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="content">content</label>
            <input
              id="content"
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              type="submit"
              onclick={() => {
                updatePost({
                  variables: {
                    postId: id,
                    title,
                    content,
                  },
                });
              }}
            >
              update
            </button>
          </form>
        </div>
      )}

      {/* delete post  */}
      {isMyProfile && (
        <p
          className="Post_delete"
          onClick={() => {
            deletePost({
              variables: {
                postId: id,
              },
            });
          }}
        >
          delete
        </p>
      )}
    </div>
  );
}
