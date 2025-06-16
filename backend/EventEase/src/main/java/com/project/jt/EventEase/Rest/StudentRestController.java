package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class StudentRestController {

    @Autowired
    private final StudentDao studentDao;

    private final StudentService studentService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentRestController(StudentService studentService, PasswordEncoder passwordEncoder,StudentDao studentDao) {
        this.studentService = studentService;
        this.passwordEncoder = passwordEncoder;
        this.studentDao = studentDao;
    }
    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInStudent(Authentication authentication) {
        String username = authentication.getName();
        Student student = studentDao.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return ResponseEntity.ok(student);
    }


    // Create new student (including user info + profile in one step)
    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        try {
            // Encode password before saving
            student.setPassword(passwordEncoder.encode(student.getPassword()));

            // Optionally, set role here or elsewhere

            // Save student (includes user + student info)
            Student savedStudent = studentService.saveStudent(student);

            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Failed to create student: " + e.getMessage());
        }
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
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        try {
            Student updated = studentService.updateStudent(id, student);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Failed to update student: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.ok("Student deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Failed to delete student: " + e.getMessage());
        }
    }
}
