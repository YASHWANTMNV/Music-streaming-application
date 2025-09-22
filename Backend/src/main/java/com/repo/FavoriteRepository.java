package com.repo;

import com.entity.Favorite;
import com.entity.User;


import com.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
	boolean existsByUserAndMusic(User user, Music music);
    List<Favorite> findByUserId(Long userId);

}
