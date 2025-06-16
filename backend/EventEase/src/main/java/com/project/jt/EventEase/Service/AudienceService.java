package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Audience;

import java.util.List;
import java.util.Optional;

public interface AudienceService {
    Audience saveAudience(Audience audience);
    List<Audience> getAllAudiences();
    Optional<Audience> getAudienceById(Long id);
    void deleteAudience(Long id);
}
