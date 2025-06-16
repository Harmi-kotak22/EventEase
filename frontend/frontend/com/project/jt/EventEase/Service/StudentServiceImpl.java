package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Entity.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);

    @Autowired
    private StudentDao studentDao;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public Student saveStudent(Student student) {
        try {
            logger.info("Attempting to save student: {}", student);
            
            // Validate user association
            if (student.getUser() == null) {
                logger.error("Student must have an associated user");
                throw new IllegalArgumentException("Student must have an associated user");
            }

            // Validate required fields
            if (student.getName() == null || student.getName().trim().isEmpty()) {
                logger.error("Student name is required");
                throw new IllegalArgumentException("Student name is required");
            }
            if (student.getDepartment() == null || student.getDepartment().trim().isEmpty()) {
                logger.error("Student department is required");
                throw new IllegalArgumentException("Student department is required");
            }
            if (student.getRollNumber() == null || student.getRollNumber().trim().isEmpty()) {
                logger.error("Student roll number is required");
                throw new IllegalArgumentException("Student roll number is required");
            }

            // Check if roll number is already in use
            Optional<Student> existingStudent = studentDao.findByRollNumber(student.getRollNumber());
            if (existingStudent.isPresent()) {
                logger.error("Roll number {} is already in use", student.getRollNumber());
                throw new IllegalArgumentException("Roll number is already in use");
            }

            Student savedStudent = studentDao.save(student);
            logger.info("Successfully saved student with ID: {}", savedStudent.getId());
            return savedStudent;
        } catch (Exception e) {
            logger.error("Error saving student", e);
            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Student> getStudentById(Long id) {
        return studentDao.findById(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public Student updateStudent(Long id, Student student) {
        return studentDao.findById(id)
                .map(existingStudent -> {
                    student.setId(id);
                    return studentDao.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteStudent(Long id) {
        studentDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Student> findByUsername(String username) {
        return studentDao.findByUsername(username);
    }
} 