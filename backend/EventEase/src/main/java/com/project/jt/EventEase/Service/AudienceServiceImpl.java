package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Audience;
import com.project.jt.EventEase.Dao.AudienceDao;
import com.project.jt.EventEase.Service.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AudienceServiceImpl implements AudienceService {

    @Autowired
    private AudienceDao audienceDao;

    @Override
    public Audience saveAudience(Audience audience) {
        return audienceDao.save(audience);
    }

    @Override
    @Transactional
    public List<Audience> getAllAudiences() {
        return audienceDao.findAll();
    }

    @Override
    public Optional<Audience> getAudienceById(Long id) {
        return audienceDao.findById(id);
    }

    @Override
    public void deleteAudience(Long id) {
        audienceDao.deleteById(id);
    }
}
