package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.EventDao;
import com.project.jt.EventEase.Dao.FeedbackDao;
import com.project.jt.EventEase.Dao.RegistrationDao;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Feedback;
import com.project.jt.EventEase.Entity.Registration;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class EventReportService {

    @Autowired
    private EventDao eventDao;

    @Autowired
    private RegistrationDao registrationDao;

    @Autowired
    private FeedbackDao feedbackDao;

    public byte[] generateReportForEvent(Long eventId) {
        Event event = eventDao.findById(eventId).orElseThrow();
        List<Registration> registrations = registrationDao.findByEventId(eventId);
        List<Feedback> feedbacks = feedbackDao.findByEventId(eventId);

        try (PDDocument document = new PDDocument(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PDPage page = new PDPage(PDRectangle.LETTER);
            document.addPage(page);

            PDPageContentStream content = new PDPageContentStream(document, page);
            content.setFont(PDType1Font.HELVETICA_BOLD, 18);
            content.beginText();
            content.setLeading(20f);
            content.newLineAtOffset(50, 750);

            content.showText("Event Report: " + event.getEventName());
            content.newLine();
            content.setFont(PDType1Font.HELVETICA, 12);
            content.showText("Date: " + event.getEventDate() + "   Time: " + event.getEventTime());
            content.newLine();
            content.showText("Venue: " + event.getVenue());
            content.newLine();
            content.showText("Total Registrations: " + registrations.size());
            content.newLine();
            content.showText("Feedback Count: " + feedbacks.size());
            content.newLine();
            double avgRating = feedbacks.stream().mapToInt(Feedback::getRating).average().orElse(0.0);
            content.showText("Average Rating: " + String.format("%.2f", avgRating));
            content.newLine();
            content.newLine();

            content.setFont(PDType1Font.HELVETICA_BOLD, 14);
            content.showText("Feedback:");
            content.newLine();
            content.setFont(PDType1Font.HELVETICA, 12);
            for (Feedback fb : feedbacks) {
                content.showText("- " + fb.getUserEmail() + " | Rating: " + fb.getRating() + " | " + (fb.getComments() != null ? fb.getComments() : "No comment"));
                content.newLine();
            }

            content.newLine();
            content.setFont(PDType1Font.HELVETICA_BOLD, 14);
            content.showText("Participants:");
            content.newLine();
            content.setFont(PDType1Font.HELVETICA, 12);
            for (Registration r : registrations) {
                String regEmail = r.getStudent().getEmail();
                String regUsername = regEmail.split("@")[0].toLowerCase();

                boolean submitted = feedbacks.stream()
                        .map(f -> f.getUserEmail().split("@")[0].toLowerCase())
                        .anyMatch(username -> username.equals(regUsername));

                content.showText("- " + regEmail + " | Feedback Submitted: " + (submitted ? "Yes" : "No"));
                content.newLine();
            }


            content.endText();
            content.close();

            document.save(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}
