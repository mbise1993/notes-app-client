import React from 'react';
import { Button } from 'react-bootstrap';
import { PulseLoader as Loader } from 'react-spinners';

import './LoadingButton.css';

export const LoadingButton = ({
  loading,
  className = '',
  disabled = false,
  children,
  ...props
}) => {
  return (
    <Button
      className={['loading-button', className]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader loading size={8} color="white" /> : children}
    </Button>
  );
};
