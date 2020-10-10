import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import { useFormFields } from '../hooks/useFormFields';
import { useAppContext } from '../state/appContext';
import { LoadingButton } from '../components/LoadingButton';
import { Errors } from '../utils/errors';

import './SignUp.css';

export const SignUp = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();
  const [newUser, setNewUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });

  const validateSignUpForm = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  };

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const user = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });

      setNewUser(user);
      setIsLoading(false);
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        await Auth.resendSignUp(fields.email);
        setNewUser({
          email: fields.email,
        });
      } else {
        Errors.handle(e);
      }

      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated(true);
      navigate('/');
    } catch (e) {
      Errors.handle(e);
      setIsLoading(false);
    }
  };

  const renderSignUpForm = () => {
    return (
      <Form onSubmit={handleSignUpSubmit}>
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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <LoadingButton
          block
          type="submit"
          loading={isLoading}
          disabled={!validateSignUpForm()}
        >
          Sign Up
        </LoadingButton>
      </Form>
    );
  };

  const renderConfirmationForm = () => {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={fields.confirmationCode}
            onChange={handleFieldChange}
          />
          <Form.Text>Please check your email for the code.</Form.Text>
        </Form.Group>

        <LoadingButton
          block
          type="submit"
          loading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoadingButton>
      </Form>
    );
  };

  return (
    <div className="sign-up">
      {newUser ? renderConfirmationForm() : renderSignUpForm()}
    </div>
  );
};
