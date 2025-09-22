import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCamera } from 'react-icons/fa';
import { Button, CircularProgress } from '@mui/material';
import { registerUser } from '../Services/api'; // Import the registerUser function

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (profilePic) {
      data.append('profilePic', profilePic);
    }

    try {
      const response = await registerUser(data); // Use the registerUser function from api.js
      console.log(response);
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/verify');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please check your details or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#4facfe',
          fontSize: '28px',
          marginBottom: '30px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>Register</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {errorMessage && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              color: '#d32f2f',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              color: '#388e3c',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {successMessage}
            </div>
          )}

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: '5px 15px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
          }}>
            <FaUser style={{ color: '#4facfe', marginRight: '10px' }} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#333'
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: '5px 15px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
          }}>
            <FaEnvelope style={{ color: '#4facfe', marginRight: '10px' }} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#333'
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: '5px 15px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
          }}>
            <FaLock style={{ color: '#4facfe', marginRight: '10px' }} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#333'
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer'
          }}>
            <FaCamera style={{ color: '#4facfe', marginRight: '10px' }} />
            <label htmlFor="profilePic" style={{
              color: '#666',
              fontSize: '15px',
              cursor: 'pointer'
            }}>
              Upload Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '10px',
              background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(79, 172, 254, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(79, 172, 254, 0.3)'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: 'white' }} />
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
