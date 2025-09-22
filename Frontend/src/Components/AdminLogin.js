import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../Services/api';
import { setSession } from '../Utils/Cookies';
import { TextField, Button, Typography, Alert, InputAdornment, Box, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import HeadphonesIcon from '@mui/icons-material/Headphones';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await adminLogin(credentials.username, credentials.password);
      setSession('adminusername', credentials.username, 30);
      navigate('/admindashboard');
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l9.9-9.9h-2.828zM32 0l-3.657 3.657 1.414 1.414L35.143 0H32zm-6.485 0L20.03 5.485 21.444 6.9l6.9-6.9h-2.83zm12.97 0l5.485 5.485-1.414 1.415-6.9-6.9h2.829zm6.485 0l8.485 8.485-1.414 1.414-9.9-9.9h2.829zm12.973 0l3.657 3.657-1.414 1.414L45.715 0h2.829zm6.484 0l5.485 5.485-1.414 1.415-6.9-6.9h2.829zm-1.415 0l-2.829 2.829h5.657L58.627 0h-2.829zM0 5.373l5.485 5.485-1.414 1.415L0 8.2V5.374zm0 5.656l8.485 8.485-1.414 1.414L0 13.857v-2.828zm0 5.657l11.485 11.485-1.414 1.414L0 19.514v-2.828zm0 5.657L14.485 36.97l-1.414 1.415L0 25.171v-2.828zm0 5.657L17.485 42.627l-1.414 1.414L0 30.829v-2.829zm0 5.657l20.485 20.485-1.414 1.414L0 36.486v-2.829zm0 5.657l23.485 23.485-1.414 1.414L0 42.143v-2.829zm0 5.657l26.485 26.485-1.414 1.414L0 47.8v-2.829zm0 5.657l29.485 29.485-1.414 1.414L0 53.457v-2.829zm0 5.657l32.485 32.485-1.414 1.414L0 59.114v-2.829z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.6
        }
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '40px 30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
          }
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HeadphonesIcon 
            sx={{ 
              fontSize: 48, 
              color: '#4facfe',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' }
              }
            }} 
          />
          <Typography 
            variant="h4" 
            sx={{ 
              mt: 2,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Admin Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#4facfe',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00f2fe'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#4facfe'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#4facfe' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#4facfe',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00f2fe'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#4facfe'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#4facfe' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(79, 172, 254, 0.3)'
              }
            }}
          >
            Login
          </Button>
        </form>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 2,
              borderRadius: '10px',
              animation: 'fadeIn 0.5s ease-in',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#4facfe',
              fontSize: '0.9rem'
            }}
          >
            © 2025 MusicStreaming | All rights reserved
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
