package com.controller;

import com.entity.Favorite;

import com.service.FavoriteService;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/favorites")
public class FavoriteController {
	@Autowired
    private FavoriteService favservice;
   
	 @PostMapping("/add/{userId}/{musicId}")
	    public ResponseEntity<Object> addItemToFavorite(@PathVariable Long userId, @PathVariable Long musicId) {
	        try {
	            Favorite favorite = favservice.addToFavorites(userId, musicId);
	            return ResponseEntity.ok(favorite);  // Return the added favorite
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());  // Return error message
	        }
	    }
	
	 @GetMapping("/user/{userId}")
	    public List<Favorite> getFavorites(@PathVariable Long userId) {
	        return favservice.getFavorites(userId);
	    }
	 @DeleteMapping("/remove/{favid}")
	    public void removeFromFav(@PathVariable Long favid) {
	        favservice.removeFromFav(favid);
	    }
	
	
}
