package com.ankit.student_management.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}