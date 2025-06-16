package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Entity.User;
import com.project.jt.EventEase.Service.StudentService;
import com.project.jt.EventEase.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;

    @PostMapping("/profile")
    public ResponseEntity<?> createStudentProfile(
            @RequestBody Map<String, String> profileData,
            Authentication authentication) {
        try {
            // Get the authenticated user
            String username = authentication.getName();
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Create and save student profile
            Student student = new Student();
            student.setUser(user);
            student.setDepartment(profileData.get("department"));
            student.setRollNumber(profileData.get("rollNumber"));
            student.setYear(Integer.parseInt(profileData.get("year")));
            student.setSection(profileData.get("section"));

            Student savedStudent = studentService.saveStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Failed to create student profile: " + e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getStudentProfile(Authentication authentication) {
        try {
            String username = authentication.getName();
            Student student = studentService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Student profile not found"));
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Failed to fetch student profile: " + e.getMessage()));
        }
    }
} 