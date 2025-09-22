import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Input, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { addMusic } from '../Services/api';

const AddMusic = () => {
  const [musicData, setMusicData] = useState({
    songName: '',
    genre: '',
    artistName: '',
    language: '',
    musicFile: null,
    coverPic: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setMusicData({ ...musicData, [name]: files[0] });
    } else {
      setMusicData({ ...musicData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Assuming addMusic is a function that posts data
      const response = await addMusic(musicData);
      console.log(response.musicData);
      setSuccess('Music uploaded successfully!');
      setMusicData({
        songName: '',
        genre: '',
        artistName: '',
        language: '',
        musicFile: null,
        coverPic: null,
      }); // Clear form after successful submission
    } catch (error) {
      setError(error.message || 'Failed to upload music.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        padding: '20px'
      }}
    >
      <Container maxWidth="sm" sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <MusicNoteIcon sx={{ 
            fontSize: 48, 
            color: '#66fcf1',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' }
            }
          }} />
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 700,
            mt: 2,
            background: 'linear-gradient(90deg, #66fcf1, #45a29e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Add New Music
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Song Name"
            name="songName"
            value={musicData.songName}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              input: { color: '#fff' },
              label: { color: '#ccc' },
              fieldset: { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#66fcf1' },
            }}
          />

          {/* Genre */}
          <TextField
            fullWidth
            variant="outlined"
            label="Genre"
            name="genre"
            value={musicData.genre}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              input: { color: '#fff' },
              label: { color: '#ccc' },
              fieldset: { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#66fcf1' },
            }}
          />

          {/* Artist Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Artist Name"
            name="artistName"
            value={musicData.artistName}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              input: { color: '#fff' },
              label: { color: '#ccc' },
              fieldset: { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#66fcf1' },
            }}
          />

          {/* Language */}
          <TextField
            fullWidth
            variant="outlined"
            label="Language"
            name="language"
            value={musicData.language}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              input: { color: '#fff' },
              label: { color: '#ccc' },
              fieldset: { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#66fcf1' },
            }}
          />

          {/* Cover Picture */}
          <Box sx={{ mt: 3 }}>
            <label htmlFor="cover-pic">
              <Input
                id="cover-pic"
                name="coverPic"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <Button
                component="span"
                variant="outlined"
                fullWidth
                sx={{
                  color: '#66fcf1',
                  borderColor: '#66fcf1',
                  borderRadius: '10px',
                  padding: '15px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(102, 252, 241, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CloudUploadIcon sx={{ mr: 1 }} />
                Select Cover Picture
              </Button>
            </label>
          </Box>

          {musicData.coverPic && (
            <Box sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}>
              <Avatar
                src={URL.createObjectURL(musicData.coverPic)}
                alt="Cover"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}
              />
              <Typography sx={{ color: '#fff' }}>
                {musicData.coverPic.name}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            <label htmlFor="music-file">
              <Input
                id="music-file"
                name="musicFile"
                type="file"
                accept="audio/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <Button
                component="span"
                variant="outlined"
                fullWidth
                sx={{
                  color: '#66fcf1',
                  borderColor: '#66fcf1',
                  borderRadius: '10px',
                  padding: '15px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(102, 252, 241, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CloudUploadIcon sx={{ mr: 1 }} />
                Select Music File
              </Button>
            </label>
          </Box>

          {musicData.musicFile && (
            <Box sx={{
              mt: 2,
              p: 2,
              background: 'rgba(102, 252, 241, 0.1)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <MusicNoteIcon sx={{ color: '#66fcf1' }} />
              <Typography sx={{ color: '#fff' }}>
                {musicData.musicFile.name}
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              mb: 2,
              background: 'linear-gradient(90deg, #66fcf1, #45a29e)',
              color: '#000',
              padding: '15px',
              borderRadius: '10px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(102, 252, 241, 0.3)'
              }
            }}
          >
            Upload Music
          </Button>
        </form>

        {error && (
          <Typography sx={{
            color: '#ff6b6b',
            mt: 2,
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography sx={{
            color: '#66fcf1',
            mt: 2,
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease'
          }}>
            {success}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default AddMusic;
