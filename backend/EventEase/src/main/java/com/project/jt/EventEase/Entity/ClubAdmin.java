package com.project.jt.EventEase.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "club_admins")
@PrimaryKeyJoinColumn(name = "id")

public class ClubAdmin extends User{


    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String clubName;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @OneToMany(mappedBy = "clubAdmin", cascade = CascadeType.ALL)
    @JsonManagedReference("clubAdmin-events") // Prevents infinite recursion
    @JsonIgnore
    private List<Event> events;

    public ClubAdmin()
    {

    }

    public ClubAdmin(User user) {
        this.setUsername(user.getUsername());
        this.setPassword(user.getPassword());
        this.setEmail(user.getEmail());
        this.setRole(user.getRole());
    }
}
