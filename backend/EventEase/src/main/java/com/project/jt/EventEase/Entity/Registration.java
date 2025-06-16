package com.project.jt.EventEase.Entity;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Data
public class Registration implements Serializable{
    public Registration()
    {

    }

    public Registration(String status, Event event, String registrationType,Student student) {
        this.status = status;
        this.event = event;
        this.student = student;
        this.registrationType = registrationType;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(value=TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable=false)
    private String status;

    @Column(nullable = false)
    private String registrationType;  // PARTICIPANT or AUDIENCE



    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @JsonIgnoreProperties({"participants", "registrations"}) // avoid recursion

    //  @JsonBackReference("event-registrations")
    private Event event;

    @ManyToOne
  //  @JsonBackReference("student-registration")
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties({"registrations", "events"}) // avoid recursion

    private Student student; // Can be Participant or Audience

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now(); // Sets timestamp to the current date and time
    }

}
