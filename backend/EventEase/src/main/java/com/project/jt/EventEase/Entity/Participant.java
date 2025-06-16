package com.project.jt.EventEase.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "participants")
public class Participant {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Now it's auto-generated
    // Shared primary key with Student

    @ManyToOne(optional = false ,fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = true) // Only if applicable
    private String teamName;

    @Column(nullable = false)
    private String eventTopic;

    @Column(nullable = true) // Only if applicable
    private String submissionLink;

    @Column(columnDefinition = "TEXT")
    private String additionalInfo;

    @ManyToOne(optional = false)
    @JsonIgnore
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    public Participant() { }





}
