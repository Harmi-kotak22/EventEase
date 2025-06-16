package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Registration;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Repository.EventRepository;
import com.project.jt.EventEase.Repository.RegistrationRepository;
import com.project.jt.EventEase.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/registrations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RegistrationController {

    private final RegistrationRepository registrationRepository;
    private final StudentRepository studentRepository;
    private final EventRepository eventRepository;

    @Autowired
    public RegistrationController(RegistrationRepository registrationRepository,
                                StudentRepository studentRepository,
                                EventRepository eventRepository) {
        this.registrationRepository = registrationRepository;
        this.studentRepository = studentRepository;
        this.eventRepository = eventRepository;
    }

    @PostMapping
    public ResponseEntity<?> registerForEvent(@RequestBody Map<String, Object> registrationRequest) {
        try {
            String status = (String) registrationRequest.get("status");
            Long eventId = ((Number) ((Map<?, ?>) registrationRequest.get("event")).get("id")).longValue();
            String username = (String) ((Map<?, ?>) registrationRequest.get("student")).get("username");

            // Get the student entity
            Optional<Student> studentOpt = studentRepository.findByUsername(username);
            if (studentOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Student not found with username: " + username));
            }

            // Get the event entity
            Optional<Event> eventOpt = eventRepository.findById(eventId);
            if (eventOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Event not found with id: " + eventId));
            }

            // Create and save the registration
            Registration registration = new Registration(status, eventOpt.get(), studentOpt.get());
            Registration savedRegistration = registrationRepository.save(registration);

            return ResponseEntity.ok(savedRegistration);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllRegistrations() {
        return ResponseEntity.ok(registrationRepository.findAll());
    }
} 