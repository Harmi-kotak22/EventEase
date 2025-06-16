package com.project.jt.EventEase.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@PrimaryKeyJoinColumn(name = "id")
@Table(name = "students", uniqueConstraints = {
        @UniqueConstraint(columnNames = "rollNumber")
})
public class Student extends User {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String rollNumber;

    @Column(nullable = false)
    private String department;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  //  @JsonManagedReference("student-registration")
    private List<Registration> registrations;

    public Student() { }

    public Student(User user) {
        // copy the base‐class fields into this instance
        this.setUsername(user.getUsername());
        this.setPassword(user.getPassword());
        this.setEmail(user.getEmail());
        this.setRole(user.getRole());
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty())
            throw new IllegalArgumentException("Name cannot be null or empty");
        this.name = name.trim();
    }

    public void setDepartment(String department) {
        if (department == null || department.trim().isEmpty())
            throw new IllegalArgumentException("Department cannot be null or empty");
        this.department = department.trim();
    }

    public void setRollNumber(String rollNumber) {
        if (rollNumber == null || rollNumber.trim().isEmpty())
            throw new IllegalArgumentException("Roll number cannot be null or empty");
        this.rollNumber = rollNumber.trim();
    }
    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Participant> participants;

}
