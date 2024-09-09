import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { StudentProvider } from './context/StudentContext'; 
import StudentRegistration from './components/Register/StudentRegistration';
import Login from './components/Login/StudentLogin';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Student from './components/StudentsDetails/StudentDetails';
import EditStudent from './components/UpdateStudent/EditStudent';
import AddStudent from './components/AddStudent/AddStudent';

function App() {
  return (
    <UserProvider>
      <StudentProvider> 
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<StudentRegistration />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={Dashboard} />}
              />
              <Route
                path="/students"
                element={<PrivateRoute element={Student} />}
              />
              <Route
                path="/edit-student/:id"
                element={<PrivateRoute element={EditStudent} />}
              />
              <Route
                path="/add-student"
                element={<PrivateRoute element={AddStudent} />}
              />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </StudentProvider>
    </UserProvider>
  );
}

export default App;