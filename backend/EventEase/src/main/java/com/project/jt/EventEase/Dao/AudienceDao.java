package com.project.jt.EventEase.Dao;

import com.project.jt.EventEase.Entity.Audience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AudienceDao extends JpaRepository<Audience, Long> {
}
