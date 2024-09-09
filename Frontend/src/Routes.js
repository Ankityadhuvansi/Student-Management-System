// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute component
import Dashboard from './components/Dashboard';
import Student from './components/StudentsDetails/Student';
import EditStudent from './components/UpdateStudent/EditStudent';
import AddStudent from './components/AddStudent/AddStudent';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/students" element={<PrivateRoute element={Student} />} />
      <Route path="/edit-student/:id" element={<PrivateRoute element={EditStudent} />} />
      <Route path="/add-student" element={<PrivateRoute element={AddStudent} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;