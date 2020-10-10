import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';

import config from '../config';
import { LoadingButton } from '../components/LoadingButton';
import { Errors } from '../utils/errors';
import { StorageApi } from '../api/storageApi';

import './NewNote.css';

export const NewNote = () => {
  const navigate = useNavigate();
  const file = React.useRef(null);
  const [content, setContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = () => {
    return content.length > 0;
  };

  const handleFileChange = (e) => {
    file.current = e.target.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );

      return;
    }

    try {
      setIsLoading(true);

      const attachment = file.current
        ? await StorageApi.s3Upload(file.current)
        : null;

      await API.post('notes', '/notes', {
        body: {
          content,
          attachment,
        },
      });

      navigate('/');
    } catch (e) {
      Errors.handle(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="new-note">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <LoadingButton
          block
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={!validateForm()}
        >
          Create Note
        </LoadingButton>
      </Form>
    </div>
  );
};
