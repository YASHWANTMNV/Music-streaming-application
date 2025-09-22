package com.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import com.dto.LoginDto;
import com.dto.RegisterDto;
import com.entity.User;
import com.repo.UserRepository;
import com.utils.EmailUtil;
import com.utils.OtpUtil;

@Service
public class UserService {

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private UserRepository userRepository;
    @Value("${upload.directory}")
    private String uploadDir;

    @Transactional
    public String register(RegisterDto registerDto) {
        Optional<User> existingUser = userRepository.findByEmail(registerDto.getEmail());

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (!user.isActive()) {
                deleteUser(user); // Delete inactive user before re-registration
            } else {
                return "Email is already registered and verified. Please login.";
            }
        }

        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(registerDto.getEmail(), otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send OTP. Please try again.");
        }

        User newUser = new User();
        newUser.setName(registerDto.getName());
        newUser.setEmail(registerDto.getEmail());
        newUser.setPassword(registerDto.getPassword());
        newUser.setOtp(otp);
        newUser.setOtpGeneratedTime(LocalDateTime.now());
        newUser.setActive(false);
        if (registerDto.getProfilePicturePath() != null) {
            newUser.setProfilePicture(registerDto.getProfilePicturePath());
        }

        userRepository.save(newUser);
        return "Success";
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String saveProfilePicture(MultipartFile profilePicture) {
    	
        String fileName = UUID.randomUUID().toString() + "-" + StringUtils.cleanPath(profilePicture.getOriginalFilename());
        String filePath = "/profile_pics/" + fileName;

        try {
            Path uploadPath = Paths.get(uploadDir + "/profile_pics");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path targetPath = uploadPath.resolve(fileName);
            profilePicture.transferTo(targetPath.toFile());
            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }



    public String verifyAccount(String email, String otp) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        // Check if user exists
        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        if (user.isActive()) {
            return "User is already verified";
        }

        // Validate OTP
        if (user.getOtp() != null && user.getOtp().equals(otp)) {
            user.setActive(true); 
            user.setOtp(null);    
            userRepository.save(user);
            return "Verification successful";
        }

        return "Invalid OTP. Please try again.";
    }


    public String regenerateOtp(String email) {
        try {
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
            
            String otp = otpUtil.generateOtp();
            emailUtil.sendOtpEmail(email, otp);
            
            user.setOtp(otp);
            user.setOtpGeneratedTime(LocalDateTime.now());
            userRepository.save(user);
            
            return "OTP sent successfully. Please verify your account within 30 seconds.";
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to resend OTP: " + e.getMessage());
        }
    }


    public List<User> getAllUsers() {
        return userRepository.findAll(); // Fetch all users
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null); // Fetch user by id
    }

    public String login(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + loginDto.getEmail()));
        if (!loginDto.getPassword().equals(user.getPassword())) {
            return "Password is incorrect";
        } else if (!user.isActive()) {
            return "Your account is not verified";
        }
        return "{\"success\":true, \"message\":\"Login successful\", \"userId\":" + user.getId() + "}";
    }

    // Scheduled method to clean up old unverified users
    @Scheduled(cron = "0 0/1 * * * ?") // Runs every minute
    public void cleanupOldUnverifiedUsers() {
        LocalDateTime thresholdTime = LocalDateTime.now().minusSeconds(60); // 60 seconds threshold
        userRepository.deleteByOtpGeneratedTimeBefore(thresholdTime);
    }

    public String forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));

        // Generate a unique token for password reset
        String token = UUID.randomUUID().toString();
        user.setResetToken(token); // Assume you add a resetToken field to User entity
        user.setTokenGeneratedTime(LocalDateTime.now());
        userRepository.save(user);

        // Generate reset link (you should set your actual application URL here)
        String resetLink = "http://localhost:3000/reset-password?token=" + token;

        try {
            emailUtil.sendPasswordResetEmail(email, resetLink); // Implement this method in EmailUtil
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send reset link. Please try again.");
        }

        return "Password reset link sent to your email.";
    }
    public Map<String, Object> resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
            .orElseThrow(() -> new RuntimeException("Invalid or expired token."));

        // Optionally check if the token is expired
        if (Duration.between(user.getTokenGeneratedTime(), LocalDateTime.now()).getSeconds() > 3600) { // Token valid for 1 hour
            return createResponse(false, "Token has expired. Please request a new password reset.");
        }

        user.setPassword(newPassword);
        user.setResetToken(null); // Clear the token after successful reset
        userRepository.save(user);

        return createResponse(true, "Password has been successfully reset.");
    }

    // Helper method to create response
    private Map<String, Object> createResponse(boolean success, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", message);
        return response;
    }
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
}
