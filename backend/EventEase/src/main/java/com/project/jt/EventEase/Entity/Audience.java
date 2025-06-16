package com.project.jt.EventEase.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "audience")
@PrimaryKeyJoinColumn(name = "id")
public class Audience extends Student {

    public Audience() { }

    public Audience(Student student) {
        // copy the Student (and therefore User) fields
        this.setUsername(student.getUsername());
        this.setPassword(student.getPassword());
        this.setEmail(student.getEmail());
        this.setRole(student.getRole());
        this.setName(student.getName());
        this.setDepartment(student.getDepartment());
        this.setRollNumber(student.getRollNumber());
    }
}
