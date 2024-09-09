# Docker Configuration for Student Management System

This project includes Docker configurations for both the React frontend and Spring Boot backend applications. The Docker setup ensures that both services can be built, run, and managed in isolated environments.

## Prerequisites

- Docker: Ensure Docker is installed and running on your machine. You can download Docker from [Docker's official website](https://www.docker.com/products/docker-desktop).
- Docker Compose: Optional, but recommended for managing multi-container applications. You can install Docker Compose from [Docker's official documentation](https://docs.docker.com/compose/install/).

## Project Structure

The project is organized as follows:
tudentManagementSpring/ │ ├── backend/ # Spring Boot application │ ├── Dockerfile # Dockerfile for Spring Boot │ └── ... # Other Spring Boot files │ ├── frontend/ # React application │ ├── Dockerfile # Dockerfile for React │ └── ... # Other React files │ └── docker-compose.yaml # Docker Compose configuration file


## Docker Configuration

### 1. Dockerfile for React Application

Create a `Dockerfile` in the `frontend` directory with the following content:

```Dockerfile
# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ ./

# Build the React application
RUN npm run build

# Serve the application using Nginx
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
### 2. Dockerfile for Spring Boot Application
Create a Dockerfile in the backend directory with the following content:
```
    # Use the official OpenJDK image
    FROM openjdk:17-jdk-slim

    # Set the working directory
    WORKDIR /app

    # Copy the JAR file into the container
    COPY target/Student_Management-0.0.1-SNAPSHOT.jar app.jar

    # Expose port 8080
    EXPOSE 8080

    # Command to run the JAR file
    ENTRYPOINT ["java", "-jar", "app.jar"]
```
### 3. Docker Compose Configuration

Create a docker-compose.yaml file in the root directory with the following content:

```
version: '3.8'

services:
  spring-boot-app:
    build:
      context: ./backend
    ports:
      - "8080:8080"
    networks:
      - student-network

react-app:
    build:
      context: ./frontend
    ports:
      - "80:80"
    networks:
      - student-network

networks:
  student-network:
    driver: bridge
```
## Usage

### Build and Run Containers

To build and start the Docker containers for both the React frontend and Spring Boot backend applications, follow these steps:

1. **Navigate to the Root Directory**

   Open a terminal and navigate to the root directory of your project, where the `docker-compose.yaml` file is located:

   cd /path/to/StudentManagementSpring

2. **Build and Start the Containers**

   Run the following Docker Compose command to build the images and start the containers:

   docker-compose up --build

   `--build` forces Docker Compose to rebuild the images before starting the containers. This ensures that any changes to the Dockerfiles or application code are included.

3. **Verify the Containers are Running**

   You can check the status of the containers using:

   docker-compose ps

   This will list all running containers along with their status and exposed ports.

4. **Access the Applications**

   - **React Frontend**: Open your web browser and go to http://localhost:80. You should see the React application running.

   - **Spring Boot Backend**: The backend service will be accessible at http://localhost:8080.

5. **Stopping the Containers**

   To stop and remove the containers, run:

   docker-compose down

   This command will stop and remove the containers defined in the `docker-compose.yaml` file. It also removes any networks created by Docker Compose.

### Additional Commands

- **View Logs**

  To view the logs for all running containers:

  docker-compose logs

  To view logs for a specific service, such as `react-app`:

  docker-compose logs react-app

- **Rebuild Containers**

  If you need to rebuild the containers without starting them:

  docker-compose build

- **Run Containers in Detached Mode**

  To run the containers in the background (detached mode):

  docker-compose up --build -d

  You can then use `docker-compose down` to stop and remove the containers.

For more information on Docker Compose commands and options, refer to the Docker Compose documentation.
