import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getMusicById, updateMusic } from '../Services/api'; // Importing necessary API functions

const UpdateArt = () => {
  const { id } = useParams(); // To get the music ID from the URL
  const history = useNavigate();

  const [music, setMusic] = useState({
    songName: '',
    genre: '',
    artistName: '',
    language: '',
    musicFile: null,
    coverPic: null,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch music details by ID on component mount
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const data = await getMusicById(id);
        setMusic({
          songName: data.songName,
          genre: data.genre,
          artistName: data.artistName,
          language: data.language,
          musicFile: null,
          coverPic: null,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch music details');
        setLoading(false);
      }
    };
    fetchMusic();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMusic((prevMusic) => ({
      ...prevMusic,
      [name]: value,
    }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setMusic((prevMusic) => ({
      ...prevMusic,
      [name]: files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedMusic = await updateMusic(id, music);
      history.push(`/music/${updatedMusic.id}`); // Redirect to the updated music's detail page
    } catch (err) {
      setError('Failed to update music');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1DB954' }}>
        Update Music Details
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Song Name"
          name="songName"
          value={music.songName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Genre"
          name="genre"
          value={music.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Artist Name"
          name="artistName"
          value={music.artistName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Language"
          name="language"
          value={music.language}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          name="musicFile"
          onChange={handleFileChange}
          accept="audio/*"
          style={{ marginBottom: '16px' }}
        />
        <input
          type="file"
          name="coverPic"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: '16px' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#1DB954',
              color: '#fff',
              '&:hover': { backgroundColor: '#1ED760' },
              marginTop: 2,
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Music'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateArt;
