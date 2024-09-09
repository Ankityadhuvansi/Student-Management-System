package com.ankit.student_management.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student")
@Data
public class Student {

    @Id
    private String id;

    @Indexed(unique = true)
    @NonNull
    @NotBlank(message = "Username is required")
    private String username;

    @NonNull
    @NotBlank(message = "Password is required")
    private String password;

    @NonNull
    @NotBlank(message = "Name is required")
    private String studentName;

    @NonNull
    @NotBlank(message = "Contact details are required")
    private String contactDetails;

    @NonNull
    @NotBlank(message = "Address is required")
    private String address;

    @NonNull
    @NotBlank(message = "Pin code is required")
    private String pincode;
}