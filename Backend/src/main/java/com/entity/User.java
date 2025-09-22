package com.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String email;
  private String password;
  private boolean active;
  private String otp;
  private LocalDateTime otpGeneratedTime;
  private String profilePicture;
  private String resetToken; // Add this field
  private LocalDateTime tokenGeneratedTime; // Add this field

public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
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
public boolean isActive() {
	return active;
}
public void setActive(boolean active) {
	this.active = active;
}
public String getOtp() {
	return otp;
}
public void setOtp(String otp) {
	this.otp = otp;
}
public LocalDateTime getOtpGeneratedTime() {
	return otpGeneratedTime;
}
public void setOtpGeneratedTime(LocalDateTime otpGeneratedTime) {
	this.otpGeneratedTime = otpGeneratedTime;
}
public String getResetToken() {
	return resetToken;
}
public void setResetToken(String resetToken) {
	this.resetToken = resetToken;
}
public LocalDateTime getTokenGeneratedTime() {
	return tokenGeneratedTime;
}
public void setTokenGeneratedTime(LocalDateTime tokenGeneratedTime) {
	this.tokenGeneratedTime = tokenGeneratedTime;
}
public String getProfilePicture() {
	return profilePicture;
}
public void setProfilePicture(String profilePicture) {
	this.profilePicture = profilePicture;
}
  
}

