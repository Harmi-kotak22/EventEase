package com.project.jt.EventEase.Dao;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.project.jt.EventEase.Entity.Student;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNumber(String rollNumber);
    Optional<Student> findByUsername(String username);
    
    @EntityGraph(attributePaths = "registrations")
    List<Student> findAll();
} 