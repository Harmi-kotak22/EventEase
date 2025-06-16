package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.User;
import com.project.jt.EventEase.Entity.ClubAdmin;
import com.project.jt.EventEase.Entity.Role;
import com.project.jt.EventEase.Entity.RegistrationCode;
import com.project.jt.EventEase.Service.UserService;
import com.project.jt.EventEase.Repository.RegistrationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RegistrationCodeRepository registrationCodeRepository;

    @Autowired
    public AuthController(UserService userService, 
                         PasswordEncoder passwordEncoder,
                         RegistrationCodeRepository registrationCodeRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.registrationCodeRepository = registrationCodeRepository;
    }

    /**
     * This endpoint is protected by Basic Auth.
     * The client must supply the Basic Auth header,
     * and Spring will inject the authenticated UserDetails.
     */
    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login(Authentication authentication) {
        // user.getAuthorities() contains something like "ROLE_STUDENT" or "ROLE_CLUB_ADMIN"
        String username = authentication.getName(); // Get username
        String fullRole = authentication.getAuthorities().iterator().next().getAuthority(); // e.g., ROLE_CLUB_ADMIN
        System.out.println("Authenticated user: " + authentication.getName());
        return ResponseEntity.ok(Map.of(
                "username", username,
                "role", fullRole
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> registrationData) {
        try {
            String username = (String) registrationData.get("username");
            String password = (String) registrationData.get("password");
            String email = (String) registrationData.get("email");
            String registrationCode = (String) registrationData.get("registrationCode");
            
            // Check if username already exists
            if (userService.getUserByUsername(username).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Username already exists"));
            }

            // Handle club admin registration
            if (registrationCode != null) {
                var codeOptional = registrationCodeRepository.findByCodeAndUsedFalse(registrationCode);
                
                if (codeOptional.isEmpty()) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("message", "Invalid or used registration code"));
                }

                RegistrationCode code = codeOptional.get();
                if (code.getExpiryDate().isBefore(LocalDateTime.now())) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("message", "Registration code has expired"));
                }

                // Create ClubAdmin
                ClubAdmin clubAdmin = new ClubAdmin();
                clubAdmin.setUsername(username);
                clubAdmin.setPassword(passwordEncoder.encode(password));
                clubAdmin.setEmail(email);
                clubAdmin.setRole(Role.CLUB_ADMIN);
                
                // Set ClubAdmin specific fields
                clubAdmin.setName((String) registrationData.get("name"));
                clubAdmin.setClubName((String) registrationData.get("clubName"));
                clubAdmin.setPhoneNumber((String) registrationData.get("phoneNumber"));

                code.setUsed(true);
                registrationCodeRepository.save(code);
                
                User savedUser = userService.saveUser(clubAdmin);
                return ResponseEntity.ok(Map.of(
                        "message", "Club Admin registration successful",
                        "username", savedUser.getUsername(),
                        "role", savedUser.getRole().toString()
                ));
            } else {
                // Regular user registration
                User user = new User();
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode(password));
                user.setEmail(email);
                user.setRole(Role.STUDENT);
                
                User savedUser = userService.saveUser(user);
                return ResponseEntity.ok(Map.of(
                        "message", "Registration successful",
                        "username", savedUser.getUsername(),
                        "role", savedUser.getRole().toString()
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

    // Add this endpoint to generate registration codes (protected for admin use only)
    @PostMapping("/generate-code")
    public ResponseEntity<?> generateRegistrationCode() {
        RegistrationCode code = new RegistrationCode();
        code.setCode(generateUniqueCode());
        registrationCodeRepository.save(code);
        
        return ResponseEntity.ok(Map.of(
            "code", code.getCode(),
            "expiryDate", code.getExpiryDate().toString()
        ));
    }

    private String generateUniqueCode() {
        // Generate a random 8-character alphanumeric code
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            code.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        return code.toString();
    }
} 