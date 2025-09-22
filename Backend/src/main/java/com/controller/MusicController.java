package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.entity.Music;
import com.service.MusicService;

@RestController
@RequestMapping("/api/music")
public class MusicController {

    @Autowired
    private MusicService musicService;

    @PostMapping("/add")
    public ResponseEntity<Music> addMusic(
            @RequestParam("songName") String songName,
            @RequestParam("genre") String genre,
            @RequestParam("artistName") String artistName,
            @RequestParam("language") String language,
            @RequestParam("musicFile") MultipartFile musicFile,
            @RequestParam("coverPic") MultipartFile coverPic) {
        try {
            Music music = new Music();
            music.setSongName(songName);
            music.setGenre(genre);
            music.setArtistName(artistName);
            music.setLanguage(language);

            Music savedMusic = musicService.addMusic(music, musicFile, coverPic);
            return ResponseEntity.ok(savedMusic);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<Iterable<Music>> viewAllMusic() {
        try {
            Iterable<Music> musicList = musicService.getAllMusic();
            return ResponseEntity.ok(musicList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // View music by ID
    @GetMapping("/{id}")
    public ResponseEntity<Music> viewMusicById(@PathVariable Long id) {
        try {
            Music music = musicService.getMusicById(id);
            return music != null ? ResponseEntity.ok(music) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Update music
    @PutMapping("/update/{id}")
    public ResponseEntity<Music> updateMusic(
            @PathVariable Long id,
            @RequestParam("songName") String songName,
            @RequestParam("genre") String genre,
            @RequestParam("artistName") String artistName,
            @RequestParam("language") String language) {
        try {
            Music updatedMusic = musicService.updateMusic(id, songName, genre, artistName, language);
            return updatedMusic != null ? ResponseEntity.ok(updatedMusic) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Delete music
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMusic(@PathVariable Long id) {
        try {
            boolean isDeleted = musicService.deleteMusic(id);
            return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}