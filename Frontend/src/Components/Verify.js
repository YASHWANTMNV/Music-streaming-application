import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Alert,
  TextField,
  Box,
} from '@mui/material';
import { verifyAccount, regenerateOtp } from '../Services/api'; // Import the APIs

const Verify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill('')); // Array for 6-character OTP
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(60); // Countdown timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    setError(false);

    try {
      const enteredOtp = otp.join('');
      const result = await verifyAccount(email, enteredOtp); // Use the API function

      setIsSuccess(true);
      setMessage(result || 'Verification successful!');
      setTimeout(() => navigate('/userlogin'), 2000); // Navigate to login after success
    } catch (errMessage) {
      setIsSuccess(false);
      setError(true);
      console.log(error);
      setMessage(errMessage || 'Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(30); // Reset timer
    setMessage('');
    setError(false);

    try {
      const result = await regenerateOtp(email); // Use the API function
      setMessage(result || 'OTP resent successfully. Please check your email.');
    } catch (errMessage) {
      setIsResendDisabled(false); // Allow retrying resend
      setError(true);
      setMessage(errMessage || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent more than 1 character per input
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next input if not empty
    if (value && index < otp.length - 1) {
      const nextField = document.getElementById(`otp-input-${index + 1}`);
      nextField && nextField.focus();
    }
  };

  return (
    <div>
      <style>{`body {
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
      <Container
        maxWidth="xs"
        sx={{
          marginTop: 5,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          background: 'linear-gradient(45deg, #121212)',
          border: '1px solid #8A2BE2',
          color: '#E1E1E1',
        }}
      >
        <Box textAlign="center" py={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#8A2BE2' }}
          >
            Verify Account
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A2BE2' }}>
            Please enter the OTP sent to your email address.
          </Typography>
        </Box>

        {message && (
          <Alert
            severity={isSuccess ? 'success' : 'error'}
            sx={{
              mb: 2,
              backgroundColor: isSuccess ? '#4CAF50' : '#F44336',
              color: '#FFFFFF',
            }}
          >
            {message}
          </Alert>
        )}

        <Box mb={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            sx={{
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#8A2BE2' },
                '&:hover fieldset': { borderColor: '#8A2BE2' },
              },
              '& .MuiInputLabel-root': { color: '#8A2BE2' },
              '& .MuiInputBase-input': { color: '#E1E1E1' },
            }}
          />

          <Box display="flex" justifyContent="center" gap={1} my={2}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center', fontSize: '1.2rem', color: '#8A2BE2' },
                }}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                sx={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#8A2BE2' },
                    '&:hover fieldset': { borderColor: '#8A2BE2' },
                    '&.Mui-focused fieldset': { borderColor: '#8A2BE2' },
                  },
                  '& input': {
                    padding: '8px',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!email || otp.includes('')}
            sx={{
              padding: '10px 20px',
              marginBottom: 2,
              backgroundColor: '#8A2BE2',
              '&:hover': { backgroundColor: '#6A1CB8' },
            }}
          >
           <Typography variant="body2" gutterBottom sx={{ color: '#8A2BE2' }}> Verify</Typography>
          </Button>
        </Box>

        <Box textAlign="center">
          <Typography variant="body2" gutterBottom sx={{ color: '#8A2BE2' }}>
            Didn't receive the OTP?
          </Typography>
          <Button
            variant="text"
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#8A2BE2',
            }}
          >
         <Typography variant="body2" gutterBottom sx={{ color: '#8A2BE2' }}>  Resend OTP {isResendDisabled && `in ${timer}s`}</Typography> 
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Verify;
