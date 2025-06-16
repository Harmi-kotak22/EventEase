package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.Registration;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Service.RegistrationService;
import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Dao.EventDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;

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
    private StudentDao studentDao;
    
    @Autowired
    private EventDao eventDao;

    @PostMapping
    public ResponseEntity<?> createRegistration(@RequestBody Map<String, Object> registrationRequest, Authentication authentication) {
        try {
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
            registration.setRegistrationType((String) registrationRequest.get("registrationType"));
            registration.setStudent(student);
            registration.setEvent(event);

            Registration savedRegistration = registrationService.saveRegistration(registration);
            return ResponseEntity.ok(savedRegistration);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/{id}")
    public Optional<Registration> getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('CLUB_ADMIN')")
    public ResponseEntity<?> updateRegistrationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String newStatus = statusUpdate.get("status");
            if (newStatus == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Status is required"));
            }

            Registration registration = registrationService.getRegistrationById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found with ID: " + id));

            registration.setStatus(newStatus);
            Registration updatedRegistration = registrationService.saveRegistration(registration);
            
            return ResponseEntity.ok(updatedRegistration);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Failed to update registration status: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public String deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
        return "Registration deleted successfully";
    }

    @PutMapping("/{id}")
    public Registration updateRegistration(@PathVariable Long id, @RequestBody Registration registration) {
        return registrationService.updateRegistration(id, registration);
    }
} 