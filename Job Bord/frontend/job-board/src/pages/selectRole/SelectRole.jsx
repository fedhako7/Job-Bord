import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Container } from '@mui/material';

function SelectRole() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!role) {
      console.log('[Select Role] No role selected');
      return;
    } else{
      console.log('[Select Role] Role Selected:', role);
    }

    try {
      const response = await axiosInstance.post(
        '/auth/set-role',
        { role },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send JWT for auth
          },
        }
      );

      console.log('[Select Role] Backend Response:', response.data);
      // console.log('[]')

      // Navigate based on role
      if (!role || role === null) {
        navigate('/select-role');
      } else if (role === 'Employer' || role === 'Job Seeker') {
        localStorage.setItem('role', role); // Update localStorage
        navigate('/');
      } else {
        navigate('/landing'); // Fallback
      }
    } catch (error) {
      console.error('[Select Role] Error:', error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select Your Role
      </Typography>
      <form onSubmit={handleRoleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">I am a:</FormLabel>
          <RadioGroup value={role} onChange={(e) => setRole(e.target.value)}>
            <FormControlLabel value="Employer" control={<Radio />} label="Employer" />
            <FormControlLabel value="Job Seeker" control={<Radio />} label="Job Seeker" />
          </RadioGroup>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default SelectRole;