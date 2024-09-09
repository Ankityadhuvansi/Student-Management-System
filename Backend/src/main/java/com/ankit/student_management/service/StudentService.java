package com.ankit.student_management.service;

import com.ankit.student_management.entity.Student;
import com.ankit.student_management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {


    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder ;

    @Autowired
    public StudentService(StudentRepository studentRepository , PasswordEncoder passwordEncoder){
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<Student> getAll() {
        return studentRepository.findAll();
    }


    public void saveStudent(Student student){
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);
    }
    public Optional<Student> findById(String id){
        return studentRepository.findById(id);
    }
    public Student findByStudentUserName(String username){
        return studentRepository.findStudentByUsername(username);
    }
    public boolean deleteStudentByUsername(String name){
        studentRepository.deleteByStudentName(name);
        return true;
    }

    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }
}
