import React, { useState } from 'react';
import { login } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../Utils/Cookies';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';

function Login() {
    // State to hold the user's email and password input
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // State to track the submission status of the form
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Hook for navigation between routes
    const navigate = useNavigate();

    // Update state when input fields change
    const handleChange = (e) => {
        setCredentials({
            ...credentials, // Spread existing values
            [e.target.name]: e.target.value // Dynamically update the field
        });
    };

    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await login(credentials);

            if (response && response.success && response.userId) {
                const userId = response.userId;
                setSession('userId', userId, 30);

                // Change the admin redirect path
                if (userId === 1) {
                    navigate('/admindashboard');  // Changed from '/adminHome' to '/admindashboard'
                    alert("Admin Login successful!");
                } else {
                    navigate('/userHome');
                    alert("Login successful!");
                }
            } else {
                alert(response.message || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Navigate to the forgot password page
    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
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
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                width: '400px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>Welcome Back!</h2>
                <p style={{
                    fontSize: '1.1rem',
                    marginBottom: '30px',
                    color: 'rgba(255,255,255,0.8)'
                }}>Log in to continue exploring the best music around</p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '5px 15px'
                    }}>
                        <FaEnvelope style={{ color: '#ffffff', marginRight: '10px' }} />
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 0',
                                border: 'none',
                                background: 'none',
                                outline: 'none',
                                fontSize: '15px',
                                color: '#ffffff',
                                '&::placeholder': {
                                    color: 'rgba(255,255,255,0.7)'
                                }
                            }}
                        />
                    </div>

                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '5px 15px'
                    }}>
                        <FaLock style={{ color: '#ffffff', marginRight: '10px' }} />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 0',
                                border: 'none',
                                background: 'none',
                                outline: 'none',
                                fontSize: '15px',
                                color: '#ffffff',
                                '&::placeholder': {
                                    color: 'rgba(255,255,255,0.7)'
                                }
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: 'transparent',
                            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white',
                            padding: '14px',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(79, 172, 254, 0.3)'
                            }
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} style={{ color: 'white' }} />
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <div 
                    onClick={handleForgotPassword}
                    style={{
                        marginTop: '20px',
                        fontSize: '0.9rem',
                        color: '#4facfe',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: '#00f2fe',
                            textDecoration: 'underline'
                        }
                    }}
                >
                    Forgot Password?
                </div>
            </div>
        </div>
    );
}

export default Login;
