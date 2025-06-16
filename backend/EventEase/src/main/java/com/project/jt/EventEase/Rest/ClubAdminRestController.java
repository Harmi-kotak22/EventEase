package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.ClubAdmin;
import com.project.jt.EventEase.Service.ClubAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/club-admins")
public class ClubAdminRestController {


    private ClubAdminService clubAdminService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ClubAdminRestController(ClubAdminService clubAdminService,PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.clubAdminService = clubAdminService;
    }


    @PostMapping
    public ClubAdmin createClubAdmin(@RequestBody ClubAdmin clubAdmin) {
        clubAdmin.setPassword(passwordEncoder.encode(clubAdmin.getPassword()));

        return clubAdminService.saveClubAdmin(clubAdmin);
    }

    @GetMapping
    public List<ClubAdmin> getAllClubAdmins() {
        return clubAdminService.getAllClubAdmins();
    }

    @GetMapping("/{id}")
    public Optional<ClubAdmin> getClubAdminById(@PathVariable Long id) {
        return clubAdminService.getClubAdminById(id);
    }

    @PutMapping("/{id}")
    public ClubAdmin updateClubAdmin(@PathVariable Long id, @RequestBody ClubAdmin clubAdmin) {
        return clubAdminService.updateClubAdmin(id, clubAdmin);
    }

    @DeleteMapping("/{id}")
    public String deleteClubAdmin(@PathVariable Long id) {
        clubAdminService.deleteClubAdmin(id);
        return "Club Admin deleted successfully";
    }
}
