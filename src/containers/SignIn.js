import React from 'react';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../state/appContext';
import { LoadingButton } from '../components/LoadingButton';
import { Errors } from '../utils/errors';
import { useFormFields } from '../hooks/useFormFields';

import './SignIn.css';

export const SignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await Auth.signIn(fields.email, fields.password);
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
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <LoadingButton
          block
          type="submit"
          loading={isLoading}
          disabled={!validateForm()}
        >
          Sign In
        </LoadingButton>
      </Form>
    </div>
  );
};
