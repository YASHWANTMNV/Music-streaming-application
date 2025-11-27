import axios from 'axios';

// Use environment variable for API URL or fallback to localhost (backend now on 8081)
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility to handle API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return error.response?.data?.message || 'An unexpected error occurred.';
};

// ✅ Authentication APIs
export const adminLogin = async (username, password) => {
  try {
    const response = await api.post('/admin/login', null, {
      params: { username, password },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const login = async (loginData) => {
  try {
    const response = await api.post('/api/login', loginData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await api.post('/api/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ OTP Verification APIs
export const verifyAccount = async (email, otp) => {
  try {
    const response = await api.put('/api/verify', { email, otp });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const regenerateOtp = async (email) => {
  try {
    const response = await api.put('/api/regenerate-otp', null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ Music Management APIs
export const addMusic = async (musicData) => {
  const formData = new FormData();
  Object.entries(musicData).forEach(([key, value]) => formData.append(key, value));

  try {
    const response = await api.post('/api/music/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getAllMusic = async () => {
  try {
    const response = await api.get('/api/music/all');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getMusicById = async (id) => {
  try {
    const response = await api.get(`/api/music/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch music by ID');
  }
};

export const updateMusic = async (id, musicData) => {
  const formData = new FormData();
  Object.entries(musicData).forEach(([key, value]) => formData.append(key, value));

  try {
    const response = await api.put(`/api/music/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteMusic = async (id) => {
  try {
    const response = await api.delete(`/api/music/delete/${id}`);
    return response.status === 200;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ User Management APIs
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ Password Management APIs
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/reset-password', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await api.post('/forgot-password', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ Favorites Management APIs
export const addItemToFavorite = async (userId, musicId) => {
  try {
    const response = await api.post(`/favorites/add/${userId}/${musicId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.warn('Duplicate favorite detected.');
    }
    throw new Error(handleApiError(error));
  }
};

export const getFavorites = async (userId) => {
  try {
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const removeFromFav = async (favoriteId) => {
  try {
    await api.delete(`/favorites/remove/${favoriteId}`);
    console.log('Favorite removed successfully.');
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all albums
export const getAllAlbums = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/albums`);
    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Add a new album
export const addAlbum = async (albumData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(albumData),
    });
    if (!response.ok) {
      throw new Error('Failed to add album');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Add song to album
export const addSongToAlbum = async (albumId, songId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/albums/${albumId}/songs/${songId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to add song to album');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
