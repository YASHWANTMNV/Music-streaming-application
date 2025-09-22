import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, CssBaseline, Collapse } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { getSession, clearSession } from '../Utils/Cookies';

const drawerWidth = 240;

const UserHome = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!getSession('userId')) {
      navigate('/userlogin');
    }
    // Animate welcome message
    setShowWelcome(true);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage if needed
    clearSession('userId'); // Clear the userId session
    navigate('/'); // Redirect to the login page
  };

  const handleFavoritesClick = () => {
    const userId = getSession('userId'); // Get the userId from the session
    if (userId) {
      // Navigate to the favorites page by userId
      navigate(`/favorites/${userId}`);
    } else {
      navigate('/userlogin'); // Redirect to login if userId is not found
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#030303' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            color: '#8B5CF6', // Changed from #1DB954 to purple
            borderRight: 'none',
            backgroundImage: 'linear-gradient(180deg, rgba(18, 18, 18, 0.98) 0%, rgba(28, 28, 28, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '4px 0 25px rgba(0, 0, 0, 0.5)'
          },
        }}
      >
        <Box sx={{ 
          textAlign: 'center', 
          p: 4,
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)', // Changed to purple
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            animation: 'pulse 3s infinite'
          }
        }}>
          <HeadphonesIcon sx={{ 
            fontSize: 56, 
            color: '#8B5CF6', // Changed to purple
            filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.6))',
            animation: 'float 3s ease-in-out infinite'
          }} />
          <Typography variant="h5" sx={{ 
            color: '#8B5CF6', // Changed to purple
            fontWeight: 800,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: 2,
            textShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }
          }}>
            Music Hub
          </Typography>
        </Box>

        <List sx={{ mt: 3, px: 2 }}>
          {[
            { text: 'Songs', icon: <MusicNoteIcon />, action: () => navigate('/userviewallmusic'), color: '#8B5CF6' }, // Changed to purple
            { text: 'Albums', icon: <AlbumIcon />, action: () => navigate('/useralbums'), color: '#8B5CF6' }, // Changed to purple
            { text: 'Favorites', icon: <FavoriteIcon />, action: handleFavoritesClick, color: '#ff4081' },
            { text: 'Logout', icon: <LogoutIcon />, action: handleLogout, color: '#ff6347' }
          ].map((item, index) => (
            <ListItem 
              button 
              key={index}
              onClick={item.action}
              onMouseEnter={() => setSelectedItem(index)}
              onMouseLeave={() => setSelectedItem(null)}
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: selectedItem === index ? 'translateX(10px)' : 'none',
                backgroundColor: selectedItem === index ? `${item.color}15` : 'transparent',
                borderRadius: '16px',
                marginY: 1,
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: `${item.color}15`,
                  '&::before': {
                    transform: 'scale(1.5)',
                    opacity: 0.3
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  backgroundColor: item.color,
                  transform: 'scale(0)',
                  opacity: 0,
                  transition: 'all 0.4s ease',
                  borderRadius: 'inherit',
                  zIndex: 0
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: item.color,
                transition: 'all 0.3s ease',
                transform: selectedItem === index ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                zIndex: 1
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: '#fff',
                  zIndex: 1,
                  '& .MuiTypography-root': {
                    fontWeight: selectedItem === index ? 'bold' : 'normal',
                    transition: 'all 0.3s ease',
                    letterSpacing: selectedItem === index ? '1px' : 'normal'
                  }
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: drawerWidth,
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0F0F0F 0%, #1a1a1a 100%)', // Darker background
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)', // Changed to purple
            opacity: 0.5,
            pointerEvents: 'none'
          }
        }}
      >
        <Collapse in={showWelcome} timeout={1000}>
          <Box sx={{
            textAlign: 'center',
            animation: 'fadeIn 2s ease-out',
            position: 'relative',
            padding: 6,
            borderRadius: '30px',
            background: 'rgba(139, 92, 246, 0.08)', // Changed to purple
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(139, 92, 246, 0.1)', // Changed to purple
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <Typography variant="h2" gutterBottom sx={{
              color: '#8B5CF6', // Changed to purple
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: 3,
              textShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
              letterSpacing: '3px',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '25%',
                width: '50%',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)', // Changed to purple
                animation: 'glow 1.5s ease-in-out infinite alternate'
              }
            }}>
              Welcome to Music Hub!
            </Typography>
            <Typography variant="h5" sx={{
              color: '#fff',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.8,
              opacity: 0.9,
              marginTop: 4,
              fontWeight: 300,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
              Discover and enjoy your favorite music. Browse through our collection of songs and create your personal playlist.
            </Typography>
            
            {/* Added Visual Elements */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
              marginTop: 8,
              width: '100%'
            }}>
              {[
                { icon: <MusicNoteIcon sx={{ fontSize: 40 }}/>, title: 'Explore Music', desc: 'Discover new tracks and artists' },
                { icon: <AlbumIcon sx={{ fontSize: 40 }}/>, title: 'Create Albums', desc: 'Organize your favorite songs' },
                { icon: <FavoriteIcon sx={{ fontSize: 40 }}/>, title: 'Save Favorites', desc: 'Build your personal collection' }
              ].map((item, index) => (
                <Box key={index} sx={{
                  padding: 3,
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    background: 'rgba(29, 185, 84, 0.1)',
                    boxShadow: '0 10px 30px rgba(29, 185, 84, 0.2)'
                  }
                }}>
                  <Box sx={{
                    color: '#1DB954',
                    marginBottom: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: '#fff', marginBottom: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#b3b3b3' }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Animated Waves */}
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              overflow: 'hidden',
              zIndex: -1,
              opacity: 0.5
            }}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    bottom: i * -10,
                    left: '-50%',
                    width: '200%',
                    height: '100px',
                    background: `rgba(29, 185, 84, ${0.1 - i * 0.02})`,
                    borderRadius: '40%',
                    animation: `wave ${4 + i}s infinite linear`,
                    transformOrigin: '50% 50%',
                    '@keyframes wave': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Collapse>
      </Box>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          @keyframes glow {
            from { opacity: 0.4; filter: brightness(0.8); }
            to { opacity: 1; filter: brightness(1.2); }
          }
        `}
      </style>
    </Box>
  );
};

export default UserHome;
