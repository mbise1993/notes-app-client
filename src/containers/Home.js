import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../state/appContext';
import { Errors } from '../utils/errors';

import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadNotes = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const results = await API.get('notes', '/notes');
        setNotes(results);
      } catch (e) {
        Errors.handle(e);
      }

      setIsLoading(false);
    };

    loadNotes();
  }, [isAuthenticated]);

  const renderNotes = () => {
    return (
      <div className="notes">
        <h1>Your Notes</h1>
        <ListGroup>
          {!isLoading && (
            <>
              <ListGroup.Item action onClick={() => navigate('/notes/new')}>
                <h4>
                  <strong>{'\uFF0B'}</strong> Create a new note
                </h4>
              </ListGroup.Item>
              {notes.map((note) => (
                <ListGroup.Item
                  key={note.noteId}
                  action
                  onClick={() => navigate(`/notes/${note.noteId}`)}
                >
                  <p className="primary-text">
                    <strong>{note.content.trim().split('\n')}</strong>
                  </p>
                  <span className="secondary-text">{`Created: ${new Date(
                    note.createdAt
                  ).toLocaleString()}`}</span>
                </ListGroup.Item>
              ))}
            </>
          )}
        </ListGroup>
      </div>
    );
  };

  const renderLander = () => {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  };

  return (
    <div className="home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
};
