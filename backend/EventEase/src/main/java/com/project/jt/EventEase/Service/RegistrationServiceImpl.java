package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.EventDao;
import com.project.jt.EventEase.Dao.RegistrationDao;
import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Registration;
import com.project.jt.EventEase.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationDao registrationDao;

    @Autowired
    private EventDao eventDao;

    @Autowired
    private StudentDao studentDao;

    @Override
    @Transactional
    public Registration saveRegistration(Registration registration) {
        if (registration.getEvent() == null || registration.getStudent() == null) {
            throw new IllegalArgumentException("Event and Student must not be null!");
        }

        // First, find the student by username since that's what we have from the frontend
        Student student = studentDao.findByUsername(registration.getStudent().getUsername())
                .orElseThrow(() -> new RuntimeException("Student not found with username: " + registration.getStudent().getUsername()));

        // Then fetch the event by ID
        Event event = eventDao.findById(registration.getEvent().getId())
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + registration.getEvent().getId()));

        // Set the actual entities from the database
        registration.setEvent(event);
        registration.setStudent(student);

        return registrationDao.save(registration);
    }

    @Override
    public List<Registration> getAllRegistrations() {
        return registrationDao.findAll();
    }

    @Override
    public Optional<Registration> getRegistrationById(Long id) {
        return registrationDao.findById(id);
    }

    @Override
    public void deleteRegistration(Long id) {
        registrationDao.deleteById(id);
    }

    public Registration updateRegistration(Long id, Registration updatedRegistration) {
        return registrationDao.findById(id).map(existingRegistration -> {
            // Update only non-null fields
            if (updatedRegistration.getStatus() != null) {
                existingRegistration.setStatus(updatedRegistration.getStatus());
            }
            if (updatedRegistration.getEvent() != null) {
                existingRegistration.setEvent(updatedRegistration.getEvent());
            }
            if (updatedRegistration.getStudent() != null) {
                existingRegistration.setStudent(updatedRegistration.getStudent());
            }

            return registrationDao.save(existingRegistration);
        }).orElseThrow(() -> new RuntimeException("Registration not found"));
    }
    public List<Registration> getRegistrationsByStatus(String status) {
        return registrationDao.findByStatus(status);
    }
    public List<Student> getApprovedParticipantsForEvent(Long eventId) {
        List<Registration> regs = registrationDao.findApprovedParticipantsByEventId(eventId);
        return regs.stream()
                .map(Registration::getStudent)
                .collect(Collectors.toList());
    }


}