package com.project.jt.EventEase.Entity;

import jakarta.persistence.*;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;
    private String userEmail;
    private int rating;

    @Column(length = 1000)
    private String comments;

    public Feedback() {
    }

    public Feedback(Long eventId, String userEmail, int rating, String comments) {
        this.eventId = eventId;
        this.userEmail = userEmail;
        this.rating = rating;
        this.comments = comments;
    }

    // Getters and setters
    public Long getId() { return id; }
    public Long getEventId() { return eventId; }
    public String getUserEmail() { return userEmail; }
    public int getRating() { return rating; }
    public String getComments() { return comments; }

    public void setId(Long id) { this.id = id; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setRating(int rating) { this.rating = rating; }
    public void setComments(String comments) { this.comments = comments; }
}