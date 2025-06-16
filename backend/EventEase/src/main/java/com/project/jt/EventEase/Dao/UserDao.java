package com.project.jt.EventEase.Dao;

import com.project.jt.EventEase.Entity.Student;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.project.jt.EventEase.Entity.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
   // @EntityGraph(attributePaths = "events")
    List<User> findAll();
}
