import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/students/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudentDetails(response.data);
      } catch (error) {
        setError("Failed to fetch student details.");
        console.error("Failed to fetch student details:", error);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <StudentContext.Provider value={{ studentDetails, error }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => React.useContext(StudentContext);