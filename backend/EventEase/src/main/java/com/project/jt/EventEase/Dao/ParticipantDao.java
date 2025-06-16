package com.project.jt.EventEase.Dao;

import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Participant;
import com.project.jt.EventEase.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantDao extends JpaRepository<Participant, Long> {
    boolean existsByStudentAndEvent(Student student, Event event);
}
