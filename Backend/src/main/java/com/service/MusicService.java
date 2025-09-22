package com.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.entity.Music;
import com.repo.MusicRepository;

import java.io.File;
import java.io.IOException;

@Service
public class MusicService {

    @Value("${upload.directory}")
    private String uploadDirectory;

    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    public Music addMusic(Music music, MultipartFile musicFile, MultipartFile coverPic) throws IOException {
        // Ensure upload directories exist
        File musicDir = new File(uploadDirectory + "/songs");
        File coverPicDir = new File(uploadDirectory + "/coverpics");

        if (!musicDir.exists()) {
            musicDir.mkdirs();
        }
        if (!coverPicDir.exists()) {
            coverPicDir.mkdirs();
        }

        // Save music file
        String musicFileName = System.currentTimeMillis() + "_" + musicFile.getOriginalFilename();
        File musicFilePath = new File(musicDir, musicFileName);
        musicFile.transferTo(musicFilePath);

        // Save cover picture
        String coverPicFileName = System.currentTimeMillis() + "_" + coverPic.getOriginalFilename();
        File coverPicPath = new File(coverPicDir, coverPicFileName);
        coverPic.transferTo(coverPicPath);

        // Set relative paths in the Music entity
        music.setMusicFilePath("songs/" + musicFileName); // relative path
        music.setCoverPicPath("coverpics/" + coverPicFileName); // relative path

        // Save to database
        return musicRepository.save(music);
    }

    public Iterable<Music> getAllMusic() {
        return musicRepository.findAll();
    }

    public Music getMusicById(Long id) {
        return musicRepository.findById(id).orElse(null);
    }

    public Music updateMusic(Long id, String songName, String genre, String artistName, String language) {
        Music music = musicRepository.findById(id).orElse(null);
        if (music != null) {
            music.setSongName(songName);
            music.setGenre(genre);
            music.setArtistName(artistName);
            music.setLanguage(language);
            return musicRepository.save(music);
        }
        return null;
    }

    public boolean deleteMusic(Long id) {
        if (musicRepository.existsById(id)) {
            musicRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
