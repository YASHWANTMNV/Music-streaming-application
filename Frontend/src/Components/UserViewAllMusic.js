import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, List, Card, CardMedia, CardContent, TextField, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueIcon from '@mui/icons-material/Queue';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import { Link, useNavigate } from 'react-router-dom';
import { getAllMusic } from '../Services/api';

const UserViewAllMusic = () => {
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
    <Box sx={{ 
      padding: 3, 
      backgroundColor: '#121212', 
      minHeight: '100vh', 
      color: '#fff',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1c1c1c 0%, #121212 100%)'
    }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ 
          color: '#9c27b0', // Changed from #1DB954 to purple
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          textShadow: '0 0 10px rgba(156, 39, 176, 0.3)', // Updated shadow color
          fontWeight: 'bold',
          letterSpacing: '2px',
          marginBottom: 3
        }}
      >
        <MusicNoteIcon sx={{ fontSize: 40 }} /> All Music
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search by song name, artist, or genre..."
        fullWidth
        sx={{
          marginBottom: 3,
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            '& fieldset': {
              borderColor: '#9c27b0', // Changed from #1DB954
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#ba68c8', // Changed hover color
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ba68c8', // Changed focus color
            },
          }
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Decreased from 350px to 300px
        gap: 3, // Decreased from 4 to 3
        padding: 2
      }}>
        {filteredMusic && filteredMusic.length > 0 ? (
          filteredMusic.map((music) => (
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(28, 28, 28, 0.7)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(29, 185, 84, 0.2)',
                  backgroundColor: 'rgba(40, 40, 40, 0.8)',
                }
              }}
              key={music.id}
            >
              <Link
                to={`/usermusic/${music.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: 240, // Decreased from 280px to 240px
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px 12px 0 0',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  image={`http://localhost:8080/${music.coverPicPath}`}
                  alt={music.songName}
                />
                <CardContent sx={{ padding: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#9c27b0', // Changed from #1DB954
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      marginBottom: 2
                    }}
                  >
                    <PlayCircleIcon sx={{ 
                      fontSize: 28,
                      animation: 'pulse 2s infinite'
                    }} /> 
                    {music.songName}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#e0e0e0' }}>
                    <strong>Artist:</strong> {music.artistName}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#b3b3b3' }}>
                    <strong>Genre:</strong> {music.genre}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#b3b3b3' }}>
                    <strong>Language:</strong> {music.language}
                  </Typography>

                  <Box sx={{ 
                    marginTop: 2,
                    '& audio': {
                      width: '100%',
                      height: '40px',
                      borderRadius: '20px',
                      backgroundColor: '#282828',
                      '&::-webkit-media-controls-panel': {
                        backgroundColor: '#282828'
                      },
                      '&::-webkit-media-controls-play-button': {
                        backgroundColor: '#1DB954',
                        borderRadius: '50%'
                      }
                    }
                  }}>
                    <audio controls>
                      <source src={`http://localhost:8080/${music.musicFilePath}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                </CardContent>
              </Link>

              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-around',
                padding: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }}>
                <Button
                  sx={{
                    minWidth: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#9c27b0', // Changed from #1DB954
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)', // Updated shadow color
                    '&:hover': {
                      backgroundColor: '#ba68c8', // Changed hover color
                      transform: 'scale(1.1)',
                      boxShadow: '0 6px 16px rgba(156, 39, 176, 0.4)' // Updated shadow color
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToQueue(music);
                  }}
                >
                  <QueueIcon sx={{ fontSize: '24px' }} />
                </Button>

                <Button
                  sx={{
                    minWidth: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      backgroundColor: '#1e88e5',
                      transform: 'scale(1.1)',
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(music);
                  }}
                >
                  <DownloadIcon sx={{ fontSize: '24px' }} />
                </Button>

                <Button
                  sx={{
                    minWidth: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      backgroundColor: '#1e88e5',
                      transform: 'scale(1.1)',
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate(`/usermusic/${music.id}`)}
                >
                  <MusicNoteIcon sx={{ fontSize: '24px' }} />
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          <Typography sx={{ 
            gridColumn: '1 / -1',
            textAlign: 'center', 
            color: '#b3b3b3',
            marginTop: 4,
            fontSize: '1.2rem'
          }}>
            No music available
          </Typography>
        )}
      </Box>

      {/* Queue Section */}
      {queue.length > 0 && (
        <Box sx={{ 
          marginTop: 4,
          padding: 3,
          backgroundColor: 'rgba(28, 28, 28, 0.7)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h5" sx={{ 
            color: '#9c27b0', // Changed from #1DB954
            fontWeight: 'bold',
            marginBottom: 2
          }}>
            Queue:
          </Typography>
          <List>
            {queue.map((song, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                sx={{ 
                  color: '#fff',
                  padding: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(156, 39, 176, 0.1)' // Changed from rgba(29, 185, 84, 0.1)
                  }
                }}
              >
                {index + 1}. {song.songName} - {song.artistName}
              </Typography>
            ))}
          </List>
        </Box>
      )}

      {/* Now Playing Section */}
      {currentSong && (
        <Box sx={{ 
          marginTop: 4,
          padding: 3,
          backgroundColor: 'rgba(28, 28, 28, 0.7)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h5" sx={{ 
            color: '#9c27b0', // Changed from #1DB954
            fontWeight: 'bold',
            marginBottom: 2
          }}>
            Now Playing:
          </Typography>
          <Typography sx={{ 
            color: '#fff',
            fontSize: '1.1rem',
            marginBottom: 2
          }}>
            {currentSong.songName} by {currentSong.artistName}
          </Typography>
          <audio
            ref={audioRef}
            onEnded={handleSongEnd}
            controls
            style={{ width: '100%' }}
          >
            <source src={`http://localhost:8080/${currentSong.musicFilePath}`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default UserViewAllMusic;
