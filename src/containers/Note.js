import { API, Storage } from 'aws-amplify';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { Errors } from '../utils/errors';
import config from '../config';
import { LoadingButton } from '../components/LoadingButton';

import './Note.css';

export const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const file = React.useRef();
  const [content, setContent] = React.useState('');
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const loadNote = async () => {
      try {
        const result = await API.get('notes', `/notes/${id}`);
        if (result.attachment) {
          result.attachmentUrl = await Storage.vault.get(result.attachment);
        }

        setContent(result.content);
        setNote(result);
      } catch (e) {
        Errors.handle(e);
      }
    };

    loadNote();
  }, [id]);

  const validateForm = () => {
    return content.length > 0;
  };

  const formatFilename = (filename) => {
    return filename.replace(/^\w+-/, '');
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

    setIsLoading(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
  };

  return (
    <div className="note">
      {note && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          {note.attachment && (
            <Form.Group>
              <Form.Label>Attachment</Form.Label>
              <Form.Control as="div">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentUrl}
                >
                  {formatFilename(note.attachment)}
                </a>
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId="file">
            {!note.attachment && <Form.Label>Attachment</Form.Label>}
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <LoadingButton
            block
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoadingButton>
          <LoadingButton
            block
            variant="danger"
            loading={isDeleting}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </Form>
      )}
    </div>
  );
};
