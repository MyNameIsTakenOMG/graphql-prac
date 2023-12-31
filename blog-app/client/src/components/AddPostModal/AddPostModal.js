import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(title: $title, content: $content) {
      post {
        title
        content
        published
        createdAt
        user {
          name
        }
      }
      userErrors {
        message
      }
    }
  }
`;

export default function AddPostModal() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [createPost, { data, loading }] = useMutation(CREATE_POST);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleClick = () => {
    if (!content || !title) return;
    else {
      createPost({
        variables: {
          title,
          content,
        },
      });
      handleClose();
    }
  };

  useEffect(() => {
    if (data) {
      if (data.postCreate.userErrors.length) {
        setError(data.postCreate.userErrors[0].message);
      }
      if (data.signin.token) {
        localStorage.setItem('token', data.signin.token);
      }
    }

    return () => {};
  }, [data]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error && <p>{error}</p>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
