// src/components/AddStudent.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/students', {
        username,
        password,
        name,
        contactDetails,
        address,
        pincode
      });
      navigate('/students');
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleAdd}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Contact Details:
          <input
            type="text"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Pincode:
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;