package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Dao.RegistrationCodeDao;
import com.project.jt.EventEase.Entity.User;
import com.project.jt.EventEase.Entity.ClubAdmin;
import com.project.jt.EventEase.Entity.Role;
import com.project.jt.EventEase.Entity.RegistrationCode;
import com.project.jt.EventEase.Service.UserService;
import com.project.jt.EventEase.Dao.RegistrationCodeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Service.StudentServiceImpl;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    private final StudentServiceImpl studentServiceImpl;

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RegistrationCodeDao registrationCodeRepository;

    @Autowired
    public AuthController(UserService userService,
                          PasswordEncoder passwordEncoder,
                          RegistrationCodeDao registrationCodeRepository, StudentServiceImpl studentServiceImpl) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.registrationCodeRepository = registrationCodeRepository;
        this.studentServiceImpl = studentServiceImpl;
    }

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login(Authentication authentication) {
        String username = authentication.getName();
        String fullRole = authentication.getAuthorities().iterator().next().getAuthority();
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
            if ("CLUB_ADMIN".equals(registrationData.get("role"))) {
                // Count existing club admins
                boolean hasAdmins = userService.getAllUsers().stream()
                        .anyMatch(user -> user.getRole() == Role.CLUB_ADMIN);

                if (!hasAdmins) {
                    // Allow first admin without code
                    ClubAdmin clubAdmin = new ClubAdmin();
                    clubAdmin.setUsername(username);
                    clubAdmin.setPassword(passwordEncoder.encode(password));
                    clubAdmin.setEmail(email);
                    clubAdmin.setRole(Role.CLUB_ADMIN);

                    clubAdmin.setName((String) registrationData.get("name"));
                    clubAdmin.setClubName((String) registrationData.get("clubName"));
                    clubAdmin.setPhoneNumber((String) registrationData.get("phoneNumber"));

                    User savedUser = userService.saveUser(clubAdmin);
                    return ResponseEntity.ok(Map.of(
                            "message", "First Club Admin registered successfully",
                            "username", savedUser.getUsername(),
                            "role", savedUser.getRole().toString()
                    ));
                } else {
                    // Existing logic using registration code
                    if (registrationCode == null) {
                        return ResponseEntity.badRequest()
                                .body(Map.of("message", "Registration code required for Club Admin"));
                    }

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

                    ClubAdmin clubAdmin = new ClubAdmin();
                    clubAdmin.setUsername(username);
                    clubAdmin.setPassword(passwordEncoder.encode(password));
                    clubAdmin.setEmail(email);
                    clubAdmin.setRole(Role.CLUB_ADMIN);
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
                }
            }
            else {
                // Check if "isStudent" is passed
                boolean isStudent = Boolean.TRUE.equals(registrationData.get("isStudent"));

                if (isStudent) {
                    // Create and save student user
                    Student student = new Student();
                    student.setUsername(username);
                    student.setPassword(passwordEncoder.encode(password));
                    student.setEmail(email);
                    student.setRole(Role.STUDENT);

                    student.setName((String) registrationData.get("name"));
                    student.setDepartment((String) registrationData.get("department"));
                    student.setRollNumber((String) registrationData.get("rollNumber"));

                    // Save student — assuming your StudentService saves both User and Student in a transaction
                    Student savedStudent = studentServiceImpl.saveStudent(student);

                    return ResponseEntity.ok(Map.of(
                            "message", "Student registration successful",
                            "username", savedStudent.getUsername(),
                            "role", savedStudent.getRole().toString()
                    ));
                } else {
                    System.out.println("HI");
                    // Just a basic user (non-club, non-student)
                    User user = new User();
                    user.setUsername(username);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setEmail(email);
                    user.setRole(Role.STUDENT);

                    User savedUser = userService.saveUser(user);
                    return ResponseEntity.ok(Map.of(
                            "message", "Basic user registration successful",
                            "username", savedUser.getUsername(),
                            "role", savedUser.getRole().toString()
                    ));
                }
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