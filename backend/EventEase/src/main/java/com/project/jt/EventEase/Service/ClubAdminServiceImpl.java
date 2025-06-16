package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.ClubAdminDao;
import com.project.jt.EventEase.Entity.ClubAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubAdminServiceImpl implements ClubAdminService {

        @Autowired
        private ClubAdminDao clubAdminDao;

        @Override
        public ClubAdmin saveClubAdmin(ClubAdmin clubAdmin) {
            return clubAdminDao.save(clubAdmin);
        }

        @Override
        public List<ClubAdmin> getAllClubAdmins() {
            return clubAdminDao.findAll();
        }

        @Override
        public Optional<ClubAdmin> getClubAdminById(Long id) {
            return clubAdminDao.findById(id);
        }
    @Override
    public ClubAdmin updateClubAdmin(Long id, ClubAdmin updatedClubAdmin) {
        return clubAdminDao.findById(id).map(existingClubAdmin -> {
            // Update only non-null fields
            if (updatedClubAdmin.getUsername() != null) {
                existingClubAdmin.setUsername(updatedClubAdmin.getUsername());
            }
            if (updatedClubAdmin.getPassword() != null) {
                existingClubAdmin.setPassword(updatedClubAdmin.getPassword());
            }
            if (updatedClubAdmin.getEmail() != null) {
                existingClubAdmin.setEmail(updatedClubAdmin.getEmail());
            }
            if (updatedClubAdmin.getRole() != null) {
                existingClubAdmin.setRole(updatedClubAdmin.getRole());
            }
            if (updatedClubAdmin.getName() != null) {
                existingClubAdmin.setName(updatedClubAdmin.getName());
            }
            if (updatedClubAdmin.getClubName() != null) {
                existingClubAdmin.setClubName(updatedClubAdmin.getClubName());
            }
            if (updatedClubAdmin.getPhoneNumber() != null) {
                existingClubAdmin.setPhoneNumber(updatedClubAdmin.getPhoneNumber());
            }

            return clubAdminDao.save(existingClubAdmin);
        }).orElseThrow(() -> new RuntimeException("ClubAdmin not found"));
    }

    public ClubAdmin findClubAdminByUsername(String username)
    {
        return clubAdminDao.findClubAdminByUsername(username);
    }

    @Override
    public void deleteClubAdmin(Long id) {
        clubAdminDao.deleteById(id);
    }


        }
