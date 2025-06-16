package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Registration;
import com.project.jt.EventEase.Entity.Student;

import java.util.List;
import java.util.Optional;

public interface RegistrationService {
    Registration saveRegistration(Registration registration);
    List<Registration> getAllRegistrations();
    Optional<Registration> getRegistrationById(Long id);
    void deleteRegistration(Long id);
    Registration updateRegistration(Long id, Registration registration);
    List<Registration> getRegistrationsByStatus(String status);
    public List<Student> getApprovedParticipantsForEvent(Long EventId);

}
