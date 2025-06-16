package com.project.jt.EventEase.Dao;

import com.project.jt.EventEase.Entity.RegistrationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationCodeDao extends JpaRepository<RegistrationCode, Long> {
    Optional<RegistrationCode> findByCodeAndUsedFalse(String code);
}