package com.csiit.seatease.dto;

import com.csiit.seatease.entity.Student;

public class AuthenticationResponse {
    private String token;
    private Student student;

    public AuthenticationResponse(String token, Student student) {
        this.token = token;
        this.student = student;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}