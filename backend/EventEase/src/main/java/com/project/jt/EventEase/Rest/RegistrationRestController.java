package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Dao.RegistrationDao;
import com.project.jt.EventEase.Entity.Registration;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Service.EmailService;
import com.project.jt.EventEase.Service.RegistrationService;
import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Dao.EventDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping(value="/registrations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RegistrationRestController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private RegistrationDao registrationDao;

    @Autowired
    private EmailService emailService;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private EventDao eventDao;

    @PostMapping
    public ResponseEntity<?> createRegistration(@RequestBody Map<String, Object> registrationRequest, Authentication authentication) {
        try {
            System.out.println("Received registration payload: " + registrationRequest);

            // Get authenticated username
            String username = authentication.getName();

            // Get the student from database
            Student student = studentDao.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Student not found with username: " + username));

            // Get event ID from request
            Long eventId = ((Number) ((Map<?, ?>) registrationRequest.get("event")).get("id")).longValue();

            // Get event from database
            Event event = eventDao.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));

            // Create registration
            Registration registration = new Registration();
            registration.setStatus((String) registrationRequest.get("status"));
            registration.setStudent(student);
            registration.setEvent(event);
            registration.setRegistrationType((String) registrationRequest.get("registrationType"));


            Registration savedRegistration = registrationService.saveRegistration(registration);
            return ResponseEntity.ok(savedRegistration);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

//    @GetMapping("/approved")
//    public List<Registration> getApprovedRegistrations(@RequestParam(required = false) Long eventId) {
//        return registrationDao.findByEventIdAndStatus(eventId, "APPROVED");
//    }

    @GetMapping
    public List<Registration> getRegistrations(@RequestParam(required = false) Long eventId,
                                               @RequestParam(required = false) String status) {
        if (eventId != null && status != null) {
            return registrationDao.findByEventIdAndStatus(eventId, status);
        } else if (eventId != null) {
            return registrationDao.findByEventId(eventId);
        } else if (status != null) {
            return registrationDao.findByStatus(status);
        } else {
            return registrationDao.findAll();
        }
    }



    @GetMapping("/{id}")
    public Optional<Registration> getParticipantById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteParticipant(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
        return "Participant deleted successfully";
    }

    @PutMapping("/{id}")
    public Registration updateStudent(@PathVariable Long id, @RequestBody Registration registration) {
        return registrationService.updateRegistration(id, registration);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> update) {
        try {
            String newStatus = update.get("status");
            Registration registration = registrationDao.findById(id)
                    .orElseThrow(() -> new RuntimeException("Registration not found"));

            registration.setStatus(newStatus.toUpperCase());
            registrationDao.save(registration);

            if (newStatus.equals("APPROVED")) {
                emailService.sendApprovalEmail(registration.getStudent().getEmail(), registration.getEvent().getEventName());
            }

            return ResponseEntity.ok("Status updated to " + newStatus);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update status: " + e.getMessage());
        }
    }

    @PostMapping("/events/{eventId}/send-feedback")
    public ResponseEntity<?> sendFeedbackForms(@PathVariable Long eventId) {
        try {
            List<Student> participants = registrationService.getApprovedParticipantsForEvent(eventId);
            Event event = eventDao.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            for (Student student : participants) {
                String feedbackLink = "http://localhost:3000/feedback-form/" + eventId + "/" + student.getUsername();
                emailService.sendFeedbackFormEmail(student.getEmail(), student.getName(), event.getEventName(), feedbackLink);
            }

            return ResponseEntity.ok("Feedback forms sent to all approved participants.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send feedback forms: " + e.getMessage());
        }
    }



}