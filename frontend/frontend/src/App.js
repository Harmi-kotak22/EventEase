// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './Pages/StudentDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import GenerateCode from './components/GenerateCode';
import Unauthorized from './Pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationManagement from './Pages/RegistrationManagement';
import CompleteProfile from './Pages/CompleteProfile';
import FeedbackForm from './Pages/FeedbackForm';
import FeedbackAnalytics from './Pages/FeedbackAnalytics';
import LandingPage from './Pages/LandingPage'; // 👈 import your landing page
 // or './App.css' if you put Tailwind there




function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<LandingPage />} /> 
  <Route path="/login" element={<Login />} />   {/* 👈 move Login here */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['CLUB_ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/generate-code"
          element={
            <ProtectedRoute allowedRoles={['CLUB_ADMIN']}>
              <GenerateCode />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registration-management"
          element={
            <ProtectedRoute allowedRoles={['CLUB_ADMIN']}>
              <RegistrationManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/feedback/:eventId/:userEmail" element={<FeedbackForm />} />
        <Route path="/admin/feedback-analytics" element={<FeedbackAnalytics />} />


      </Routes>
    </Router>
  );
}

export default App;
  