package com.project.jt.EventEase.Dao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import com.project.jt.EventEase.Entity.ClubAdmin;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubAdminDao extends JpaRepository<ClubAdmin,Long> {
    Optional<ClubAdmin> findByPhoneNumber(String phoneNumber);

    ClubAdmin findClubAdminByUsername(String username);
}
