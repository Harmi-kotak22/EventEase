package com.project.jt.EventEase.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String eventName;

    @Column
    private String description;

    @Temporal(value=TemporalType.DATE)
    @Column(nullable = false)
    private Date eventDate;

    @Temporal(TemporalType.TIME)
    @Column(nullable=false)
    @JsonFormat(pattern = "HH:mm")
    private LocalTime eventTime;

    @Column(nullable=false)
    private String venue;

    @ManyToOne
    @JsonBackReference("clubAdmin-events")
    @JoinColumn(name = "club_admin_id", nullable = false)
    private ClubAdmin clubAdmin;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  //  @JsonManagedReference("event-registrations")
    @JsonIgnore
    private List<Registration> registrations;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Participant> participants = new ArrayList<>();

}
