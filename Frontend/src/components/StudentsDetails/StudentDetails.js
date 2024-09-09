import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDetails = () => {
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

  if (error) return <div>{error}</div>;
  if (!studentDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>Student Details</h1>
      <pre>{JSON.stringify(studentDetails, null, 2)}</pre>
    </div>
  );
};

export default StudentDetails;