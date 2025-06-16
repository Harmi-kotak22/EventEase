package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Dao.EventDao;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Feedback;
import com.project.jt.EventEase.Dao.FeedbackDao;
import com.project.jt.EventEase.Service.CertificateService;
import com.project.jt.EventEase.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/feedback-form")
public class FeedbackController {

    @Autowired
    private FeedbackDao feedbackDao;

    @Autowired
    private EventDao eventDao;

    @Autowired
    private CertificateService certificateService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public String submitFeedback(@RequestBody Feedback feedback) {
        feedbackDao.save(feedback);

        try {
            // Fetch event name from DB
            String eventName = eventDao.findById(feedback.getEventId())
                    .map(Event::getEventName)
                    .orElse("Your Event");

            // Use userEmail as participant name (or replace with real name if available)
            String name = feedback.getUserEmail();

            byte[] pdf = certificateService.generateCertificate(name, eventName);

            emailService.sendCertificate(feedback.getUserEmail(), name, eventName, pdf);

        } catch (Exception e) {
            e.printStackTrace();
            return "Feedback submitted, but certificate failed to send.";
        }

        return "Feedback submitted and certificate sent successfully.";
    }

    @GetMapping("/analytics/{eventId}")
    public Map<String, Object> getFeedbackAnalytics(@PathVariable Long eventId) {
        List<Feedback> feedbacks = feedbackDao.findByEventId(eventId);

        double avgRating = feedbacks.stream()
                .mapToInt(Feedback::getRating)
                .average()
                .orElse(0.0);

        Map<String, Object> response = new HashMap<>();
        response.put("averageRating", avgRating);
        response.put("totalResponses", feedbacks.size());
        return response;
    }
}
