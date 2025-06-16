package com.project.jt.EventEase.Dao;


import com.project.jt.EventEase.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackDao extends JpaRepository<Feedback, Long> {
    List<Feedback> findByEventId(Long eventId);
}