package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Dao.EventDao;
import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Participant;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.security.Principal;

@RestController
@RequestMapping(value="/participants" , produces = "application/json")
public class ParticipantRestController {

    private final StudentDao studentDao;
    private final ParticipantService participantService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ParticipantRestController(StudentDao studentDao, ParticipantService participantService, PasswordEncoder passwordEncoder) {
        this.studentDao = studentDao;
        this.participantService = participantService;
        this.passwordEncoder = passwordEncoder;
    }




    @Autowired
    private EventDao eventDao;
    @PostMapping("/event/{eventId}")
    public ResponseEntity<?> registerAsParticipant(@PathVariable Long eventId,
                                                   @RequestBody Participant participantInput,
                                                   Principal principal) {
        try {
            Student student = studentDao.findByUsername(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Event event = eventDao.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            Participant savedParticipant = participantService.saveParticipant(student, event, participantInput);

            event.getParticipants().add(savedParticipant);
            eventDao.save(event);

            // ✅ Recommended: return saved participant object as JSON
            return ResponseEntity.ok(savedParticipant);
        } catch (Exception e) {
            // Return proper error JSON
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to register");
            error.put("details", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getParticipantById(@PathVariable Long id, Principal principal) {
        Optional<Participant> participantOpt = participantService.getParticipantById(id);

        if (participantOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Participant not found");
        }

        Participant participant = participantOpt.get();

        // Allow only if the logged-in user is requesting their own data
        if (!participant.getStudent().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        return ResponseEntity.ok(participant);
    }

    @DeleteMapping("/{id}")
    public String deleteParticipant(@PathVariable Long id) {
        participantService.deleteParticipant(id);
        return "Participant deleted successfully";
    }
}
