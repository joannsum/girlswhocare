// src/components/Login.jsx
import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const handleLogin = () => {
    // Instead of directly redirecting, we'll call an API endpoint
    fetch('http://localhost:3001/auth/google', { 
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      // The backend should return a URL to redirect to
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Button 
      variant="contained" 
      startIcon={<GoogleIcon />} 
      onClick={handleLogin}
    >
      Login with Google
    </Button>
  );
};

export default Login;