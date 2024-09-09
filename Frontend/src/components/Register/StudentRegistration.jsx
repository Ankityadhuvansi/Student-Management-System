import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig'; 
import './StudentRegistration.css';

const StudentRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState(''); 
  const [contactDetails, setContactDetails] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axiosInstance.post('/students/register', {
        studentName,  
        username,
        password,
        contactDetails,
        address,
        pincode
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error during registration. Please try again.');
      } else {
        setError('Error during registration. Please try again.');
      }
      console.error('Error during registration', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='student-registration-container'>
      <h2 className='student-registration-heading'>Register</h2>
      <form className='student-registration-form' onSubmit={handleRegister}>
        <label className='student-registration-label'>
          Name:
          <input
            type="text"
            className='student-registration-input'
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)} 
            required
          />
        </label>
        <label className='student-registration-label'>
          Username:
          <input
            type="text"
            className='student-registration-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className='student-registration-label'>
          Password:
          <input
            type="password"
            className='student-registration-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className='student-registration-label'>
          Contact Details:
          <input
            type="text"
            className='student-registration-input'
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            required
          />
        </label>
        <label className='student-registration-label'>
          Address:
          <input
            type="text"
            className='student-registration-input'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className='student-registration-label'>
          Pincode:
          <input
            type="text"
            className='student-registration-input'
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='student-registration-button' disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className='student-registration-error'>{error}</p>}
      </form>
      <div className='student-registration-login-prompt'>
        <p>Already have an account?</p>
        <button className='student-registration-login-button' onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default StudentRegistration;