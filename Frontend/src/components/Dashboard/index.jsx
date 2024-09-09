import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig'; 
import './Dashboard.css';

const Dashboard = ({ userName }) => {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    contactDetails: '',
    address: '',
    pincode: '',
  });
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axiosInstance.get('/students/me');
        setStudent(response.data);
        setFormData({
          studentName: response.data.studentName,
          contactDetails: response.data.contactDetails,
          address: response.data.address,
          pincode: response.data.pincode,
        });
      } catch (error) {
        console.error('Failed to fetch student details:', error);
        setError('Failed to load student details.');
      }
    };

    fetchStudentDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('/students/me', formData);
      setStudent(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update student details:', error);
      setError('Failed to update student details.');
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/students/me');
      navigate('/login'); 
    } catch (error) {
      console.error('Failed to delete student account:', error);
      setError('Failed to delete student account.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {userName}!</h1>
        <p className="dashboard-subheading">Your Dashboard</p>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Profile</h2>
          {error && <p className="error-message">{error}</p>}
          {student ? (
            <div>
              {editMode ? (
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="studentName">Name:</label>
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactDetails">Contact Details:</label>
                    <input
                      type="text"
                      id="contactDetails"
                      name="contactDetails"
                      value={formData.contactDetails}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="dashboard-button">Update</button>
                </form>
              ) : (
                <div>
                  <p>Name: {student.studentName}</p>
                  <p>Contact Details: {student.contactDetails}</p>
                  <p>Address: {student.address}</p>
                  <p>Pincode: {student.pincode}</p>
                  <button onClick={() => setEditMode(true)} className="dashboard-button">Edit</button>
                </div>
              )}
              <button onClick={handleDelete} className="dashboard-button delete-button">Delete Account</button>
            </div>
          ) : (
            <div className="spinner">Loading...</div> // Add a spinner or loading animation
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;