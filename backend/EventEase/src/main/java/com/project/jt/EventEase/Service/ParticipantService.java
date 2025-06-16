package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Participant;
import com.project.jt.EventEase.Entity.Student;

import java.util.List;
import java.util.Optional;

public interface ParticipantService {
    Participant saveParticipant(Student student, Event event, Participant participant);
    List<Participant> getAllParticipants();
    Optional<Participant> getParticipantById(Long id);
    void deleteParticipant(Long id);

}
