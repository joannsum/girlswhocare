// src/components/Login.jsx
import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { supabase } from '../../supabaseClient';

const Login = () => {
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) throw error;
      
      // If successful, data.url will contain the URL to redirect to
      if (data) window.location.href = data.url;
    } catch (error) {
      console.error('Error:', error);
    }
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