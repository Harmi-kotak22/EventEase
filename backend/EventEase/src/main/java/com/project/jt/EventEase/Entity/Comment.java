package com.project.jt.EventEase.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue
    Long id;
    @ManyToOne
    @JoinColumn(name="event_id")
    Event event;
    @ManyToOne
    @JoinColumn(name="student_id")
    Student student;
    @Column(length=1000, nullable=false)
    String text;
    LocalDateTime createdAt;
    private boolean admin;

}
