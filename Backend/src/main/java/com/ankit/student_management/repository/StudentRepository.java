package com.ankit.student_management.repository;

import com.ankit.student_management.entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
    Student findStudentByUsername(String userName);
    Student deleteByStudentName(String userName);
}
