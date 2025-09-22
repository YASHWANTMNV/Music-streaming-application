import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Card, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { getSession } from '../Utils/Cookies';
import { useNavigate } from 'react-router-dom';

const ManageAlbums = () => {
  const navigate = useNavigate();
  const [albumData, setAlbumData] = useState({
    albumName: '',  
    description: '',
    coverPic: null, 
    songs: []       
  });
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const adminUsername = getSession('adminusername');
    if (!adminUsername) {
      navigate('/');
    }
    fetchAvailableSongs();
  }, [navigate]);

  const fetchAvailableSongs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/music/all');
      const data = await response.json();
      setAvailableSongs(data);
    } catch (error) {
      setError('Failed to fetch songs');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
        setAlbumData({ ...albumData, coverPic: files[0] }); // Changed to match state variable name
    } else {
        setAlbumData({ ...albumData, [name]: value });
    }
};

  const handleSongSelection = (songId) => {
    setSelectedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!albumData.coverPic) {
        setError('Please select a cover picture');
        return;
    }

    const formData = new FormData();
    formData.append('albumName', albumData.albumName);
    formData.append('description', albumData.description);
    formData.append('coverPic', albumData.coverPic);
    selectedSongs.forEach(songId => {
        formData.append('songs', songId);
    });

    try {
        const response = await fetch('http://localhost:8080/api/albums/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            setSuccess('Album created successfully!');
            setAlbumData({
                albumName: '',
                description: '',
                coverPic: null,
                songs: []
            });
            setSelectedSongs([]);
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to create album');
        }
    } catch (error) {
        console.error('Error creating album:', error);
        setError('Failed to create album');
    }
};

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
      padding: '20px'
    }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#fff', mb: 4, textAlign: 'center' }}>
          Create New Album
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Album Name"
                  name="albumName"
                  value={albumData.albumName}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    '& .MuiInputLabel-root': { color: '#fff' },
                    '& .MuiInputBase-input': { color: '#fff' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#66fcf1' },
                      '&.Mui-focused fieldset': { borderColor: '#66fcf1' }
                    }
                  }}
                  required
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={albumData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{
                    mb: 2,
                    '& .MuiInputLabel-root': { color: '#fff' },
                    '& .MuiInputBase-input': { color: '#fff' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#66fcf1' },
                      '&.Mui-focused fieldset': { borderColor: '#66fcf1' }
                    }
                  }}
                  required
                />

                <input
                  accept="image/*"
                  type="file"
                  name="coverPic"  // Changed to match state variable name
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  id="cover-pic-input"
                />
                <label htmlFor="cover-pic-input">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    sx={{
                      mb: 2,
                      bgcolor: '#66fcf1',
                      color: '#000',
                      '&:hover': {
                        bgcolor: '#45a29e'
                      }
                    }}
                  >
                    {albumData.coverPic ? 'Change Cover Picture' : 'Upload Cover Picture'}
                  </Button>
                </label>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#66fcf1',
                    color: '#000',
                    '&:hover': {
                      bgcolor: '#45a29e'
                    }
                  }}
                >
                  Create Album
                </Button>
              </form>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="h6" sx={{ color: '#66fcf1', mb: 2 }}>
                Select Songs
              </Typography>
              <List>
                {availableSongs.map((song) => (
                  <ListItem
                    key={song.id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={() => handleSongSelection(song.id)}
                        checked={selectedSongs.includes(song.id)}
                        sx={{
                          color: '#66fcf1',
                          '&.Mui-checked': {
                            color: '#66fcf1'
                          }
                        }}
                      />
                    }
                  >
                    <ListItemText
                      primary={<Typography sx={{ color: '#fff' }}>{song.songName}</Typography>}
                      secondary={<Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{song.artistName}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>

        {error && (
          <Typography sx={{ mt: 2, textAlign: 'center', color: '#ff6b6b' }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography sx={{ mt: 2, textAlign: 'center', color: '#66fcf1' }}>
            {success}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default ManageAlbums;