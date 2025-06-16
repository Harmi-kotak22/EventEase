package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Entity.User;
import com.project.jt.EventEase.Service.StudentService;
import com.project.jt.EventEase.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class StudentRestController {
    private static final Logger logger = LoggerFactory.getLogger(StudentRestController.class);

    private final StudentService studentService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Autowired
    public StudentRestController(StudentService studentService, PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.studentService = studentService;
        this.userService = userService;
        logger.info("StudentRestController initialized");
    }

    @PostMapping("/profile")
    public ResponseEntity<?> createStudentProfile(
            @RequestBody Map<String, String> profileData,
            Authentication authentication) {
        logger.info("Starting profile creation for authentication: {}", authentication.getName());
        
        try {
            // Validate required fields first
            if (!profileData.containsKey("name") || profileData.get("name").trim().isEmpty() ||
                !profileData.containsKey("department") || profileData.get("department").trim().isEmpty() ||
                !profileData.containsKey("rollNumber") || profileData.get("rollNumber").trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Name, department, and roll number are required fields"));
            }

            // Get the authenticated user
            String username = authentication.getName();
            logger.debug("Looking up user with username: {}", username);
            
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            logger.debug("Found user: id={}, username={}", user.getId(), user.getUsername());

            // Check if student profile already exists for this user
            if (studentService.findByUsername(username).isPresent()) {
                logger.warn("Student profile already exists for username: {}", username);
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Student profile already exists for this user"));
            }

            // Create new student profile
            Student student = new Student(user);
            student.setName(profileData.get("name").trim());
            student.setDepartment(profileData.get("department").trim());
            student.setRollNumber(profileData.get("rollNumber").trim());

            logger.debug("Created student object: name={}, department={}, rollNumber={}", 
                student.getName(),
                student.getDepartment(),
                student.getRollNumber());

            // Save the student profile
            Student savedStudent = studentService.saveStudent(student);
            
            logger.info("Successfully saved student profile with ID: {}", savedStudent.getId());

            return ResponseEntity.ok(Map.of(
                "id", savedStudent.getId(),
                "name", savedStudent.getName(),
                "department", savedStudent.getDepartment(),
                "rollNumber", savedStudent.getRollNumber()
            ));
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid input data: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            logger.error("Failed to create student profile", e);
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Failed to create student profile: " + e.getMessage()));
        }
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentService.saveStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
} 