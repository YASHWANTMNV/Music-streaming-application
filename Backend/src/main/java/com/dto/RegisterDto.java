package com.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {

  private String name;
  private String email;
  private String password;
  private MultipartFile profilePicture;
  private String profilePicturePath;   // For storing the file path
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public MultipartFile getProfilePicture() {
	return profilePicture;
}
public void setProfilePicture(MultipartFile profilePicture) {
	this.profilePicture = profilePicture;
}
public String getProfilePicturePath() {
	return profilePicturePath;
}
public void setProfilePicturePath(String profilePicturePath) {
	this.profilePicturePath = profilePicturePath;
}

public RegisterDto(String email, String name, String password, String profilePicturePath) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.profilePicturePath = profilePicturePath;
}

  

}

