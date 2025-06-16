package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Student;
import java.util.List;
import java.util.Optional;

public interface StudentService {
    Student saveStudent(Student student);
    List<Student> getAllStudents();
    Optional<Student> getStudentById(Long id);
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
    Optional<Student> findByUsername(String username);}