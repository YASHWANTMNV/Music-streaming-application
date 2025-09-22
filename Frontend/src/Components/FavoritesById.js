import React, { useEffect, useState } from 'react';
import { getFavorites, removeFromFav } from '../Services/api';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSession } from '../Utils/Cookies';

const FavoritesById = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = getSession('userId');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoriteList = await getFavorites(userId);
                setFavorites(favoriteList);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId]);

    const handleRemoveFavorite = async (favoriteId) => {
        const confirmed = window.confirm('Are you sure you want to remove this from your favorites?');
        if (confirmed) {
            try {
                await removeFromFav(favoriteId);
                setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
                alert('Removed from favorites');
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        }
    };

    if (!favorites || favorites.length === 0) {
        return (
            <Box
                sx={{
                    padding: 3,
                    textAlign: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#121212',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    No favorites added yet.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: 4,
                minHeight: '100vh',
                backgroundColor: '#121212',
                color: '#ffffff',
                fontFamily: 'Roboto, sans-serif',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    marginBottom: 4,
                    color: '#1DB954',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                Your Favorites
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                {favorites.map((favorite) => (
                    <Box
                        key={favorite.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 2,
                            borderRadius: '10px',
                            backgroundColor: '#1e1e1e',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img
                                src={`http://localhost:8080/${favorite.music?.coverPicPath}`}
                                alt={favorite.music?.songName}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                }}
                            />
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: '#1DB954',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {favorite.music?.songName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#b3b3b3',
                                    }}
                                >
                                    {favorite.music?.artistName}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <audio
                                controls
                                style={{ maxWidth: '300px', color: '#1DB954' }}
                            >
                                <source
                                    src={`http://localhost:8080/${favorite.music?.musicFilePath}`}
                                    type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                            </audio>
                            <IconButton
                                color="error"
                                onClick={() => handleRemoveFavorite(favorite.id)}
                                sx={{
                                    backgroundColor: '#333333',
                                    '&:hover': {
                                        backgroundColor: '#b71c1c',
                                    },
                                }}
                            >
                                <DeleteIcon sx={{ color: '#ffffff' }} />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default FavoritesById;
