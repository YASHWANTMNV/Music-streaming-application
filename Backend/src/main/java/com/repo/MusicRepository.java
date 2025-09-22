package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Music;

public interface MusicRepository extends JpaRepository<Music, Long> {
}