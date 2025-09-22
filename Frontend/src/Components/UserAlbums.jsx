import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button, TextField, DialogActions } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { getAllAlbums, getAllMusic } from '../Services/api';

const UserAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [openNewAlbumDialog, setOpenNewAlbumDialog] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    album_name: '',
    artist_name: '',
    cover_image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumsData, songsData] = await Promise.all([
          getAllAlbums(),
          getAllMusic()
        ]);
        setAlbums(albumsData);
        setSongs(songsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddSongs = (album) => {
    setSelectedAlbum(album);
    setOpenDialog(true);
  };

  const handleAddSongToAlbum = async (songId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/albums/${selectedAlbum.id}/songs/${songId}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        // Refresh albums after adding song
        const updatedAlbums = await getAllAlbums();
        setAlbums(updatedAlbums);
      }
    } catch (error) {
      console.error('Error adding song to album:', error);
    }
  };

  const handleNewAlbumOpen = () => {
    setOpenNewAlbumDialog(true);
  };

  const handleNewAlbumClose = () => {
    setOpenNewAlbumDialog(false);
    setNewAlbum({
      album_name: '',
      artist_name: '',
      cover_image: null
    });
  };

  const handleImageChange = (event) => {
    setNewAlbum({
      ...newAlbum,
      cover_image: event.target.files[0]
    });
  };

  const handleCreateAlbum = async () => {
    try {
      // Validate required fields
      if (!newAlbum.album_name || !newAlbum.artist_name || !newAlbum.cover_image) {
        alert('Please fill in all fields and select a cover image');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', newAlbum.album_name);
      formData.append('artist', newAlbum.artist_name);
      formData.append('coverImage', newAlbum.cover_image);
  
      // Changed the endpoint to match the backend
      const response = await fetch('http://localhost:8080/api/albums', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        // Refresh albums list
        const updatedAlbums = await getAllAlbums();
        setAlbums(updatedAlbums);
        handleNewAlbumClose();
        alert('Album created successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error creating album:', errorData);
        alert('Failed to create album. Please try again.');
      }
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Failed to create album. Please try again.');
    }
  };

  return (
    <Box sx={{ 
      padding: 3, 
      backgroundColor: '#121212', 
      minHeight: '100vh', 
      color: '#fff' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 4 
      }}>
        <Typography variant="h4" sx={{ 
          color: '#1DB954', 
          fontWeight: 'bold' 
        }}>
          Albums
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewAlbumOpen}
          sx={{
            backgroundColor: '#1DB954',
            '&:hover': {
              backgroundColor: '#168d40'
            }
          }}
        >
          Add New Album
        </Button>
      </Box>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
            <Card sx={{
              backgroundColor: '#181818',
              color: '#fff',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                backgroundColor: '#282828'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8080/${album.coverImage}`}
                alt={album.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  {album.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                  {album.artist}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                  {album.songs.length} songs
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                  <IconButton sx={{ color: '#1DB954' }}>
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton 
                    sx={{ color: '#1DB954' }}
                    onClick={() => handleAddSongs(album)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for adding songs to album */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: '#282828',
            color: '#fff',
            minWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ color: '#1DB954' }}>
          Add Songs to {selectedAlbum?.name}
        </DialogTitle>
        <DialogContent>
          <List>
            {songs.map((song) => (
              <ListItem key={song.id}>
                <ListItemText 
                  primary={song.songName} 
                  secondary={song.artistName} 
                  secondaryTypographyProps={{ color: '#b3b3b3' }}
                />
                <Button 
                  variant="contained" 
                  onClick={() => handleAddSongToAlbum(song.id)}
                  sx={{
                    backgroundColor: '#1DB954',
                    '&:hover': {
                      backgroundColor: '#168d40'
                    }
                  }}
                >
                  Add
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* Dialog for creating new album */}
      <Dialog 
        open={openNewAlbumDialog} 
        onClose={handleNewAlbumClose}
        PaperProps={{
          style: {
            backgroundColor: '#282828',
            color: '#fff',
            minWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ color: '#1DB954' }}>
          Create New Album
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Album Name"
              value={newAlbum.album_name}
              onChange={(e) => setNewAlbum({ ...newAlbum, album_name: e.target.value })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: '#1DB954',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#b3b3b3',
                }
              }}
            />
            <TextField
              label="Artist Name"
              value={newAlbum.artist_name}
              onChange={(e) => setNewAlbum({ ...newAlbum, artist_name: e.target.value })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: '#1DB954',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#b3b3b3',
                }
              }}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ color: '#fff' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button 
            onClick={handleNewAlbumClose}
            sx={{ color: '#b3b3b3' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateAlbum}
            variant="contained"
            sx={{
              backgroundColor: '#1DB954',
              '&:hover': {
                backgroundColor: '#168d40'
              }
            }}
          >
            Create Album
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserAlbums;