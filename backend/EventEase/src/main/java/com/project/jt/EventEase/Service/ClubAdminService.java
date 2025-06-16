package com.project.jt.EventEase.Service;
import com.project.jt.EventEase.Dao.ClubAdminDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.project.jt.EventEase.Entity.ClubAdmin;


public interface ClubAdminService {
    ClubAdmin saveClubAdmin(ClubAdmin clubAdmin);
    List<ClubAdmin> getAllClubAdmins();
    Optional<ClubAdmin> getClubAdminById(Long id);
    ClubAdmin updateClubAdmin(Long id, ClubAdmin clubAdmin);
    void deleteClubAdmin(Long id);

    ClubAdmin findClubAdminByUsername(String username);
}
