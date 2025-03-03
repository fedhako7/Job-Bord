import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import roles from '../role';

// Client ID from .env
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function GoogleAuth() {
  const navigate = useNavigate();
  console.log("Client ID:", import.meta.env.VITE_CLIENT_ID);
  
  const handleSuccess = async (credentialResponse) => {
    console.log('[Google Auth Success] Full Response:', credentialResponse);

    const { credential } = credentialResponse;
    const userData = {
      googleToken: credential,
    };

    console.log('[Google Auth Success] Data to Send:', userData);

    try {
      const backendResponse = await axiosInstance.post('/auth/google', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('[Google Auth Success] Backend Response:', backendResponse.data);

      const { token, user_id, fname, role } = backendResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem("user_id", user_id)
      localStorage.setItem("fname", fname)

      if (role === roles.EMPLOYER || role === roles.SEEKER) {
        localStorage.setItem('role', role);
        navigate('/');
      } else if (!role || role === null) {
        navigate('/select-role');
      } else {
        navigate('/landing');
      }

      // Redirect or update state (e.g., with useNavigate)
    } catch (error) {
      console.error('[Google Auth Success] Error Sending to Backend:', error.response?.data || error.message);
    }
  };

  const handleFailure = (error) => {
    console.error('[Google Auth Failure] Error:', error);
    console.log('[Google Auth Failure] Error Details:', error?.details || 'No additional details');
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className=' flex justify-center '>
        <div className=' max-w-[] '>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
            text="continue_with"
            className=" absolute  font-medium "
          // useOneTap // Optional: enables One Tap UI
          />
        </div>
      </div>

    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;