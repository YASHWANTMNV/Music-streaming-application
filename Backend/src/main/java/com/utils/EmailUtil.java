package com.utils;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtpEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Verify OTP");
        
        String message = String.format(
            "<div>Thanks for registering with ArtGallery. Your OTP is: <strong>%s</strong></div>", otp);
        
        mimeMessageHelper.setText(message, true);
        javaMailSender.send(mimeMessage);
    }


    // New method for sending password reset email
    public void sendPasswordResetEmail(String email, String resetLink) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Password Reset Request");
        mimeMessageHelper.setText("""
            <div>
              <p>To reset your password, click the link below:</p>
              <a href="%s" target="_blank">Reset Password</a>
            </div>
            """.formatted(resetLink), true);
        javaMailSender.send(mimeMessage);
    }
}
