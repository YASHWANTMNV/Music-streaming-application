import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, IconButton, Card, Grid } from '@mui/material';
import { clearSession, getSession } from '../Utils/Cookies';
import { useNavigate } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LogoutIcon from '@mui/icons-material/Logout';
import AlbumIcon from '@mui/icons-material/Album';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [stats, setStats] = useState({
    totalSongs: 0,
    totalAlbums: 0,
    recentUploads: 0
  });

  useEffect(() => {
    const adminUsername = getSession('adminusername');
    if (!adminUsername) {
      navigate('/');
    }
    
    // Fetch recent uploads and stats
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/music/recent');
        const data = await response.json();
        setRecentUploads(data);
        setStats({
          totalSongs: 25,
          totalAlbums: 25,
          recentUploads: data.length || 5
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setStats({
          totalSongs: 25,
          totalAlbums: 25,
          recentUploads: 5
        });
      }
    };

    fetchData();
  }, [navigate]);

  const menuItems = [
    { text: 'Add Music', icon: <AddCircleIcon />, action: () => navigate('/addmusic'), color: '#1DB954' },
    { text: 'View Music', icon: <LibraryMusicIcon />, action: () => navigate('/viewallmusic'), color: '#1976d2' },
    { text: 'Manage Albums', icon: <AlbumIcon />, action: () => navigate('/managealbums'), color: '#ff9800' },
    { text: 'Logout', icon: <LogoutIcon />, action: () => handleLogout(), color: '#d32f2f' }
  ];

  const handleLogout = () => {
    clearSession('adminusername');
    navigate('/');
  };

  const [recentUploads, setRecentUploads] = useState([]);
  const [showRecentUploads, setShowRecentUploads] = useState(false);

  useEffect(() => {
    const adminUsername = getSession('adminusername');
    if (!adminUsername) {
      navigate('/');
    }
    // Fetch stats from your API
    // This is a placeholder. Implement actual API calls
    setStats({
      totalSongs: 25,
      totalAlbums: 25,
      recentUploads: 5
    });
    
    // Fetch recent uploads
    const fetchRecentUploads = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/music/recent');
        const data = await response.json();
        setRecentUploads(data);
      } catch (error) {
        console.error('Error fetching recent uploads:', error);
      }
    };

    fetchRecentUploads();
  }, [navigate]);

  const StatCard = ({ title, value, icon, color, onClick, onMouseEnter, onMouseLeave }) => (
    <Card 
      sx={{
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 8px 24px ${color}40`
        }
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h6" sx={{ color: color }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color: '#fff', mt: 1 }}>
            {value}
          </Typography>
        </Box>
        <IconButton sx={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </IconButton>
      </Box>
    </Card>
  );

  // Recent uploads popup
  const RecentUploadsPopup = () => (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        width: '300px',
        backgroundColor: '#282828',
        borderRadius: 2,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        p: 2,
        zIndex: 1000,
        display: showRecentUploads ? 'block' : 'none'
      }}
    >
      <Typography variant="h6" sx={{ color: '#ff9800', mb: 2 }}>
        Recent Uploads
      </Typography>
      <List>
        {Array.isArray(recentUploads) && recentUploads.map((song, index) => (
          <ListItem key={index} sx={{ 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            '&:last-child': { borderBottom: 'none' }
          }}>
            <ListItemText
              primary={<Typography sx={{ color: '#fff' }}>{song.songName}</Typography>}
              secondary={
                <Typography sx={{ color: '#b3b3b3', fontSize: '0.8rem' }}>
                  {new Date(song.uploadDate).toLocaleString()}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box display="flex" height="100vh">
      <Box
        sx={{
          width: '280px',
          backgroundColor: '#1a1a1a',
          borderRight: '1px solid #333',
          transition: 'width 0.3s',
          padding: '20px 0'
        }}
      >
        <Box p={3} textAlign="center">
          <DashboardIcon sx={{ fontSize: 40, color: '#1DB954', mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Admin Dashboard
          </Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={item.action}
              sx={{
                margin: '8px 16px',
                borderRadius: '12px',
                transition: 'all 0.3s',
                backgroundColor: hoveredItem === index ? `${item.color}20` : 'transparent',
                '&:hover': {
                  backgroundColor: `${item.color}20`,
                  transform: 'translateX(5px)'
                }
              }}
            >
              <Box sx={{ 
                mr: 2, 
                color: item.color,
                transition: 'transform 0.3s',
                transform: hoveredItem === index ? 'scale(1.2)' : 'scale(1)'
              }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: hoveredItem === index ? item.color : '#fff'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        flexGrow={1}
        p={4}
        sx={{
          backgroundColor: '#121212',
          overflowY: 'auto'
        }}
      >
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: '#fff',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <MusicNoteIcon sx={{ fontSize: 35, color: '#1DB954' }} />
          Welcome to Admin Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard 
              title="Total Songs" 
              value={stats.totalSongs} 
              icon={<MusicNoteIcon />} 
              color="#1DB954"
              onClick={() => navigate('/viewallmusic')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard 
              title="Total Albums" 
              value={stats.totalAlbums} 
              icon={<AlbumIcon />} 
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ position: 'relative' }}>
            <StatCard 
              title="Recent Uploads" 
              value={stats.recentUploads} 
              icon={<AddCircleIcon />} 
              color="#ff9800"
              onMouseEnter={() => setShowRecentUploads(true)}
              onMouseLeave={() => setShowRecentUploads(false)}
            />
            <RecentUploadsPopup />
          </Grid>
        </Grid>

        <Box sx={{ 
          mt: 4, 
          p: 3, 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ color: '#1DB954', mb: 2 }}>
            Quick Actions
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc' }}>
            Manage your music collection efficiently using the options on the left.
            Add new songs, create albums, and organize your content all in one place.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
