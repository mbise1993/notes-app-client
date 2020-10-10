import React from 'react';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../state/appContext';
import { LoadingButton } from '../components/LoadingButton';
import { Errors } from '../utils/errors';

import './SignIn.css';

export const SignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const validate = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await Auth.signIn(email, password);
      setIsAuthenticated(true);
      navigate('/');
    } catch (e) {
      Errors.handle(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-in">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <LoadingButton
          block
          type="submit"
          loading={isLoading}
          disabled={!validate()}
        >
          Sign In
        </LoadingButton>
      </Form>
    </div>
  );
};
