package com.project.jt.EventEase.Dao;

import com.project.jt.EventEase.Entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationDao extends JpaRepository<Registration, Long> {
    @Query("SELECT r FROM Registration r JOIN FETCH r.student JOIN FETCH r.event WHERE r.status = :status")

    List<Registration> findByStatus(@Param("status") String status);
    List<Registration> findByEventId(Long eventId);

    List<Registration> findByEventIdAndStatus(Long eventId, String status);

    @Query("SELECT r FROM Registration r WHERE r.event.id = :eventId AND r.status = 'APPROVED' AND r.registrationType = 'PARTICIPANT'")
    List<Registration> findApprovedParticipantsByEventId(@Param("eventId") Long eventId);



}
