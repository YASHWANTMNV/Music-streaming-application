package com.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Favorite;
import com.entity.Music;
import com.entity.User;
import com.repo.FavoriteRepository;
import com.repo.MusicRepository;
import com.repo.UserRepository;





@Service
public class FavoriteService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private FavoriteRepository favRepository;

    public Favorite addToFavorites(Long userId, Long musicId) {
        // Check if the user and music exist
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Music music = musicRepository.findById(musicId).orElseThrow(() -> new RuntimeException("Music not found"));

        // Check if the music is already in the user's favorites
        boolean exists = favRepository.existsByUserAndMusic(user, music);
        if (exists) {
            throw new RuntimeException("Music already exists in favorites");
        }

        // Add the music to the favorites
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setMusic(music);
        favorite.setAddedAt(LocalDateTime.now());

        return favRepository.save(favorite);
    }

    public List<Favorite> getFavorites(Long userId) {
        // Find wishlist items by user ID
        List<Favorite> favs = favRepository.findByUserId(userId);
        
        // If necessary, you can also fetch additional details here
        for (Favorite wishlist : favs) {
            wishlist.getMusic(); // This ensures the Music object is fetched
        }
        
        return favs;
    }
    
    public void removeFromFav(Long favid) {
        // Remove a wishlist entry by its ID
        favRepository.deleteById(favid);
    }
}
