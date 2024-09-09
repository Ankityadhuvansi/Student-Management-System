# **Student Management System**

A Spring Boot application for managing student details, including registration, login, and CRUD operations, with MongoDB as the database.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Configuration](#configuration)
  - [MongoDB Configuration](#mongodb-configuration)
  - [Security Configuration](#security-configuration)
- [API Documentation with Swagger](#api-documentation-with-swagger)

## **Project Overview**

The Student Management System provides functionality for student registration, authentication, and managing student details. It supports user authentication with JWT and CRUD operations for student profiles.

## **Features**

- User registration and login with JWT authentication
- Secure access to endpoints based on user roles
- CRUD operations for managing student information
- MongoDB integration for data persistence
- API documentation with Swagger

## **Technologies Used**

- **Spring Boot** - The main framework for building the application
- **Java 17** - The programming language used
- **Maven** - For dependency management and build automation
- **MongoDB** - Database used for data persistence
- **Spring Security** - For securing the application
- **Lombok** - For reducing boilerplate code
- **JWT** - For handling authentication
- **Swagger** - For API documentation and testing

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- Java 17 or higher
- Maven 3.6+
- MongoDB (for database)
- Git (for cloning the repository)

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Ankityadhuvansi/Student-Management-System.git
   cd Student-Management-System
   ```
2. Build the Project Using Maven
  ```bash
    mvn clean install
```
3. Run the application using Maven
```bash
mvn spring-boot:run
```
4. Alternatively, you can run the JAR file after building it
```bash
java -jar target/student-management.jar
```
The application will be available at http://localhost:8080.

## **Configuration**

### **MongoDB Configuration**

Update the application properties in `src/main/resources/application.properties` (or `application.yml`) with your MongoDB settings:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/student-management
```
### **Security Configuration**

- JWT is used for authentication.
- The `SecurityConfiguration` class configures HTTP security, including CORS and CSRF settings.
- Endpoints are secured based on user authentication, and access is granted accordingly.

## **API Documentation with Swagger**

- Swagger is integrated into the application for easy API documentation and testing.
- After starting the application, you can access the Swagger UI at:

  ```bash
  http://localhost:8080/swagger-ui.html
- Swagger provides a user-friendly interface to explore and test the available endpoints.
