package com.ankit.student_management.controller;

import com.ankit.student_management.dto.LoginRequest;
import com.ankit.student_management.entity.Student;
import com.ankit.student_management.service.StudentService;
import com.ankit.student_management.service.StudentServiceImp;
import com.ankit.student_management.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/students")
@Slf4j
public class StudentController {

    private final StudentService studentService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private StudentServiceImp studentServiceImp;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    //GET
    @GetMapping("/me")
    public ResponseEntity<Student> getCurrentStudent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        if (username == null || username.isEmpty()) {
            log.error("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        log.info("Fetching student details for username: {}", username);
        Student student = studentService.findByStudentUserName(username);
        if (student == null) {
            log.error("Student not found for username: {}", username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        log.info("Student details found for username: {}", username);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        try {
            studentService.saveStudent(student);
            return new ResponseEntity<>(student, HttpStatus.CREATED);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error while Registering: " + exception.getMessage());
        }
    }
    //Student login
    @PostMapping("/login")
    public ResponseEntity<String> loginStudent(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            UserDetails userDetails = studentServiceImp.loadUserByUsername(loginRequest.getUsername());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Exception occurred during creating Authentication token", e);
            return new ResponseEntity<>("Incorrect Password or Username", HttpStatus.BAD_REQUEST);
        }
    }
    // Update student
    @PutMapping("/me")
    public ResponseEntity<Student> updateCurrentStudent(@Valid @RequestBody Student student) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Student studentInDb = studentService.findByStudentUserName(username);
        if (studentInDb == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        studentInDb.setUsername(student.getUsername());
        studentInDb.setPassword(student.getPassword());
        studentInDb.setStudentName(student.getStudentName());
        studentInDb.setContactDetails(student.getContactDetails());
        studentInDb.setAddress(student.getAddress());
        studentInDb.setPincode(student.getPincode());

        studentService.saveStudent(studentInDb);
        return new ResponseEntity<>(studentInDb, HttpStatus.OK);
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteCurrentStudent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Student student = studentService.findByStudentUserName(username);
        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }

        if (studentService.deleteStudentByUsername(username)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}