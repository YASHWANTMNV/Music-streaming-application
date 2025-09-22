import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMusicById, deleteMusic } from '../Services/api';
import { Box, Typography, IconButton, Slider } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const ViewMusicById = () => {
    const { id } = useParams(); // Retrieve the music ID from the route
    const [music, setMusic] = useState(null);
    const [isLooping, setIsLooping] = useState(false); // State to manage loop status
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause status
    const [currentTime, setCurrentTime] = useState(0); // State to manage audio playback progress
    const audioRef = useRef(null); // Ref for audio element
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const musicData = await getMusicById(id); // API call to fetch music details
                setMusic(musicData);
            } catch (error) {
                console.error('Error fetching music details:', error);
            }
        };

        fetchMusic();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this music?');
        if (confirmed) {
            try {
                await deleteMusic(id);
                navigate('/view-music'); // Redirect after successful deletion
            } catch (error) {
                console.error('Error deleting music:', error);
                alert('Failed to delete music.');
            }
        }
    };

    const handleUpdate = () => {
        navigate(`/music/update/${id}`); // Navigate to the update page
    };

    const toggleLoop = () => {
        setIsLooping((prev) => !prev); // Toggle loop state
        if (audioRef.current) {
            audioRef.current.loop = !isLooping; // Update loop attribute
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (event, newValue) => {
        audioRef.current.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const updateProgress = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    if (!music) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img
                    src={`http://localhost:8080/${music.coverPicPath}`}
                    alt={music.songName}
                    style={styles.coverImage}
                />
                <div style={styles.coverImageHole}></div>
                <div style={styles.infoContainer}>
                    <Typography variant="h4" component="h2" style={styles.songName}>
                        {music.songName}
                    </Typography>
                    <Typography variant="subtitle1" style={styles.details}>
                        <strong>Artist:</strong> {music.artistName}
                    </Typography>
                    <Typography variant="subtitle1" style={styles.details}>
                        <strong>Genre:</strong> {music.genre}
                    </Typography>
                    <Typography variant="subtitle1" style={styles.details}>
                        <strong>Language:</strong> {music.language}
                    </Typography>
                </div>
            </div>

            {/* Audio Player with Loop Toggle and Play/Pause Button */}
            <Box sx={{ marginTop: 2, width: '80%' }}>
                <audio
                    ref={audioRef}
                    controls={false}
                    style={styles.audioPlayer}
                    onTimeUpdate={updateProgress}
                >
                    <source src={`http://localhost:8080/${music.musicFilePath}`} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </Box>

            <div style={styles.controlsContainer}>
                {/* Play/Pause Toggle IconButton */}
                <IconButton color="primary" onClick={togglePlayPause} style={styles.iconButton}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                {/* Loop Toggle IconButton */}
                <IconButton
                    color={isLooping ? 'success' : 'primary'}
                    onClick={toggleLoop}
                    style={styles.iconButton}
                >
                    <LoopIcon />
                </IconButton>
                
                {/* Delete and Edit Buttons */}
                <IconButton color="error" onClick={handleDelete} style={styles.iconButton}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleUpdate} style={styles.iconButton}>
                    <EditIcon />
                </IconButton>
            </div>

            {/* Progress Slider */}
            <Slider
                value={currentTime}
                min={0}
                max={audioRef.current ? audioRef.current.duration : 100}
                step={0.1}
                onChange={handleProgressChange}
                style={styles.progressSlider}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#000',
        color: '#ffffff',
        height: '100vh',
        overflowY: 'auto',
        fontFamily: 'Roboto, sans-serif',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1f2833',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        width: '80%',
        marginBottom: '20px',
    },
    coverImage: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '10px solid #66fcf1',
        objectFit: 'cover',
        marginRight: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.8)',
        animation: 'rotate 3s linear infinite',
    },
    coverImageHole: {
        position: 'absolute',
        borderRadius: '5%',
        backgroundColor: '#000',
        zIndex: 1,
    },
    infoContainer: {
        flex: 1,
        textAlign: 'left',
    },
    songName: {
        marginBottom: '15px',
        color: '#66fcf1',
    },
    details: {
        marginBottom: '10px',
        color: '#c5c6c7',
    },
    audioPlayer: {
        width: '100%',
        borderRadius: '5px',
    },
    controlsContainer: {
        marginTop: '20px',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        width: '80%',
    },
    iconButton: {
        borderRadius: '50%',
        padding: '10px',
    },
    progressSlider: {
        width: '80%',
        marginTop: '10px',
    },
    '@keyframes rotate': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
};

export default ViewMusicById;
