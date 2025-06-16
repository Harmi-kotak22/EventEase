package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Participant;
import com.project.jt.EventEase.Dao.ParticipantDao;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantDao participantDao;
    @Transactional
    public Participant saveParticipant(Student student, Event event, Participant input) {
        // Optional: prevent duplicate participant registration
        if (participantDao.existsByStudentAndEvent(student, event)) {
            throw new RuntimeException("Participant already registered for this event");
        }

        Participant participant = new Participant();
        participant.setStudent(student);
        participant.setEvent(event); // ✅ THIS is what was missing

        participant.setTeamName(input.getTeamName());
        participant.setEventTopic(input.getEventTopic());
        participant.setSubmissionLink(input.getSubmissionLink());
        participant.setAdditionalInfo(input.getAdditionalInfo());

        return participantDao.save(participant);
    }




    @Override
    public List<Participant> getAllParticipants() {
        return participantDao.findAll();
    }

    @Override
    public Optional<Participant> getParticipantById(Long id) {
        return participantDao.findById(id);
    }

    @Override
    public void deleteParticipant(Long id) {
        participantDao.deleteById(id);
    }



}
