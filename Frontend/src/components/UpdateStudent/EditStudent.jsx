import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditStudent.css';

const EditStudent = () => {
  const [student, setStudent] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    contactDetails: '',
    address: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/students/${id}`);
        setStudent(response.data);
        setFormData({
          name: response.data.name,
          contactDetails: response.data.contactDetails,
          address: response.data.address,
          pincode: response.data.pincode,
        });
      } catch (error) {
        setError('Error fetching student details');
        console.error('Error fetching student details', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/students/${id}`, formData);
      navigate('/students');
    } catch (error) {
      setError('Error updating student details');
      console.error('Error updating student details', error);
    }
  };

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Details:
          <input
            type="text"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pincode:
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;