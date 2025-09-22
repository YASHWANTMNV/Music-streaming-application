import React from 'react';
import { Link } from 'react-router-dom';
import musicImage from '../images/music3.jpg';

const Home = () => {
  return (
    <div
      className="page"
      style={{
        backgroundColor: '#121212',
        color: '#fff',
        minHeight: '100vh',
        backgroundImage: `url(${musicImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(18, 18, 18, 0.7) 100%)',
        zIndex: 1
      }} />

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #8f65fd 0%, #a17ffd 100%)',
          padding: '15px 30px',
          color: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontFamily: "'Poppins', sans-serif", 
            color: '#fff',
            fontSize: '28px',
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            TUNEFLOW
          </h2>
        </div>

        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '30px',
            margin: 0,
            padding: 0,
          }}
        >
          {[
            { to: '/', text: 'Home' },
            { to: '/adminlogin', text: 'Admin Login' },
            { to: '/userregister', text: 'Register' },
            { to: '/userlogin', text: 'User Login' }
          ].map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontFamily: "'Poppins', sans-serif",
                  padding: '8px 16px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h1 style={{
          fontSize: '4rem',
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #fff, #8f65fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 10px rgba(143, 101, 253, 0.3)',
          animation: 'fadeInDown 1s ease-out'
        }}>
          Welcome to Tuneflow
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: '#fff',
          maxWidth: '800px',
          margin: '0 auto 40px',
          lineHeight: 1.6,
          opacity: 0.9
        }}>
          Discover, stream, and enjoy your favorite music. Join our community of music lovers today.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '40px'
        }}>
          <Link
            to="/userregister"
            style={{
              padding: '15px 40px',
              backgroundColor: '#8f65fd',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '30px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(143, 101, 253, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 6px 20px rgba(143, 101, 253, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(143, 101, 253, 0.3)';
            }}
          >
            Get Started
          </Link>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
