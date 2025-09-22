import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, List, Card, CardMedia, CardContent, TextField, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueIcon from '@mui/icons-material/Queue';
import DownloadIcon from '@mui/icons-material/Download';
import { Link, useNavigate } from 'react-router-dom';
import { getAllMusic } from '../Services/api';

const ViewAllMusic = () => {
  const [musicList, setMusicList] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const data = await getAllMusic();
        setMusicList(data);
        setFilteredMusic(data); // Initially set filtered music to all music
        setLoading(false);
      } catch (err) {
        setError('Error fetching music');
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  useEffect(() => {
    const filtered = musicList.filter((music) =>
      music.songName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      music.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      music.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMusic(filtered);
  }, [searchQuery, musicList]);

  const handleAddToQueue = (music) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue, music];
      // Play the song immediately if it's the first in the queue
      if (!currentSong && newQueue.length === 1) {
        setCurrentSong(newQueue[0]);
      }
      return newQueue;
    });
  };

  const handlePlayNextSong = useCallback(() => {
    if (queue.length > 0) {
      const [nextSong, ...remainingQueue] = queue;
      setCurrentSong(nextSong);
      setQueue(remainingQueue);
    } else {
      setCurrentSong(null); // Clear current song if queue is empty
    }
  }, [queue]);

  const handleSongEnd = () => {
    handlePlayNextSong();
  };

  const handleDownload = async (music) => {
    const confirmation = window.confirm("Do you want to download this song?");
    
    if (confirmation) {
      try {
        // Make a fetch request to get the file as a blob
        const response = await fetch(`http://localhost:8080/${music.musicFilePath}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to download the file');
        }
  
        // Create a Blob from the response
        const blob = await response.blob();
  
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${music.songName}.mp3`; // The file will be downloaded as the song name
        link.click(); // Simulate a click to trigger the download
  
        // Cleanup the object URL
        URL.revokeObjectURL(link.href);
      } catch (err) {
        console.error('Download failed', err);
        alert('Error downloading the song. Please try again.');
      }
    }
  };
  
  

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && queue.length > 0) {
      handlePlayNextSong();
    }
  }, [queue, currentSong, handlePlayNextSong]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#1DB954', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <MusicNoteIcon fontSize="large" /> All Music
      </Typography>

      <TextField
        variant="outlined"
        label="Search Music"
        fullWidth
        sx={{
          marginBottom: 2,
          borderRadius: 1,
          backgroundColor: '#f5f5f5',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1DB954',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <List>
        {filteredMusic && filteredMusic.length > 0 ? (
          filteredMusic.map((music) => (
            <Card
              sx={{
                display: 'flex',
                marginBottom: 2,
                backgroundColor: '#1c1c1c',
                color: '#fff',
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                position: 'relative',
              }}
              key={music.id}
            >
              <Link
                to={`/music/${music.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200, height: 200, borderRadius: '4px' }}
                  image={`http://localhost:8080/${music.coverPicPath}`}
                  alt={music.songName}
                />
              </Link>
              <Box sx={{ flexGrow: 1, padding: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '#1DB954', display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <PlayCircleIcon /> {music.songName}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                    <strong>Artist:</strong> {music.artistName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Genre:</strong> {music.genre}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Language:</strong> {music.language}
                  </Typography>

                  <Box sx={{ marginTop: 2 }}>
                    <audio controls style={{ width: '100%' }}>
                      <source src={`http://localhost:8080/${music.musicFilePath}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                </CardContent>
              </Box>
              <Button
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#1DB954',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                }}
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToQueue(music);
                }}
              >
                <QueueIcon />
              </Button>
              {/* Download button */}
              <Button
                sx={{
                  position: 'absolute',
                  top: 50,
                  right: 10,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1DB954',
                  },
                }}
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(music);
                }}
              >
                <DownloadIcon />
              </Button>

              {/* Button to navigate to music by id page */}
              <Button
                sx={{
                  position: 'absolute',
                  top: 90, // Adjust the position as necessary
                  right: 10,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1DB954',
                  },
                }}
                variant="contained"
                color="primary"
                onClick={() => navigate(`/music/${music.id}`)} // Navigates to music/{id}
              >
                <MusicNoteIcon />
              </Button>
            </Card>
          ))
        ) : (
          <Typography>No music available</Typography>
        )}
      </List>

      {queue.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5" sx={{ color: '#fff' }}>Queue:</Typography>
          <List>
            {queue.map((song, index) => (
              <Typography key={index} variant="body1" sx={{ color: '#fff' }}>
                {song.songName} - {song.artistName}
              </Typography>
            ))}
          </List>
        </Box>
      )}

      {currentSong && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">Now Playing:</Typography>
          <Typography>{currentSong.songName} by {currentSong.artistName}</Typography>
          <audio
            ref={audioRef}
            onEnded={handleSongEnd}
            controls
          >
            <source src={`http://localhost:8080/${currentSong.musicFilePath}`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
    </Box>
  );
};

export default ViewAllMusic;
