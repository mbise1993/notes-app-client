import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../state/appContext';

import './SignIn.css';

export const SignIn = () => {
  const { setIsAuthenticated } = useAppContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const validate = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Auth.signIn(email, password);
      setIsAuthenticated(true);
    } catch (e) {
      alert(e.message);
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

        <Button block type="submit" disabled={!validate()}>
          Sign In
        </Button>
      </Form>
    </div>
  );
};
