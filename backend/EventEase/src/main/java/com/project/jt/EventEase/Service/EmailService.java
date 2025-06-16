package com.project.jt.EventEase.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendApprovalEmail(String toEmail, String eventName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Event Registration Approved");
            helper.setText("Congratulations! You have been approved for the event: " + eventName);

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("youremail@example.com"); // Change this to your configured email
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
    public void sendFeedbackFormEmail(String email, String studentName, String eventName, String feedbackLink) {
        String subject = "Feedback for " + eventName;
        String body = "Hi " + studentName + ",\n\nThank you for participating in " + eventName +
                ". Please fill out the feedback form here: " + feedbackLink + "\n\nRegards,\nEventEase Team";

        sendSimpleMessage(email, subject, body);
    }

    public void sendCertificate(String toEmail, String name, String eventName, byte[] pdf) throws MessagingException {
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(toEmail);
        helper.setSubject("Certificate for " + eventName);
        helper.setText("Hi " + name + ",\n\nThanks for your feedback. Attached is your certificate!", false);
        helper.addAttachment("Certificate.pdf", new ByteArrayResource(pdf));
        mailSender.send(msg);
    }


}
