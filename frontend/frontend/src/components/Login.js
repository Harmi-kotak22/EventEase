// src/components/Login.js
import React, { useState } from 'react';
import api from '../Api';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('STUDENT');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [registrationCode, setRegistrationCode] = useState('');
  const [name, setName] = useState('');
  const [clubName, setClubName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [department, setDepartment] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      if (!username || !password) {
        setError("Please enter both username and password");
        return;
      }

      const token = Buffer.from(`${username}:${password}`).toString('base64');

      const response = await api.get('/auth/login', {
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.data || !response.data.role) {
        setError("Invalid response from server");
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        role: response.data.role.replace('ROLE_', '')
      }));

      const role = response.data.role.replace('ROLE_', '');
      if (role === 'STUDENT') {
        navigate('/student');
      } else if (role === 'CLUB_ADMIN') {
        navigate('/admin');
      } else {
        setError("Unknown role: " + role);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!username || !password || !email) {
    setError('Please fill in all required fields');
    setLoading(false);
    return;
  }

  try {
    const registrationData = {
      username,
      password,
      email,
      role: selectedRole
    };

    if (selectedRole === 'CLUB_ADMIN') {
      if (!name || !clubName || !phoneNumber) {
        setError('Please fill all Club Admin fields');
        setLoading(false);
        return;
      }

      if (registrationCode) {
        registrationData.registrationCode = registrationCode;
      }

      registrationData.name = name;
      registrationData.clubName = clubName;
      registrationData.phoneNumber = phoneNumber;
    } else if (selectedRole === 'STUDENT') {
      if (!name || !department || !rollNumber) {
        setError('Please fill all Student fields');
        setLoading(false);
        return;
      }

      registrationData.name = name;
      registrationData.department = department;
      registrationData.rollNumber = rollNumber;
        registrationData.isStudent = true;

    }

    await api.post('/auth/register', registrationData);

    clearForm();
    setIsLogin(true);  // switch to login form after successful registration

  } catch (err) {
    console.error('Registration failed:', err);
    setError(err.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};


  const clearForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setRegistrationCode('');
    setName('');
    setClubName('');
    setPhoneNumber('');
    setDepartment('');
    setRollNumber('');
    setError('');
    setSelectedRole('STUDENT');
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  const toggleStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#007bff',
    cursor: 'pointer'
  };

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const radioStyle = {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {isLogin ? 'EventEase Login' : 'Create Account'}
      </h2>

      {error && <p style={errorStyle}>{error}</p>}

      <input
        style={inputStyle}
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      {!isLogin && (
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      )}

      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {!isLogin && (
        <>
          <div style={radioStyle}>
            <input
              type="radio"
              id="studentRole"
              name="role"
              value="STUDENT"
              checked={selectedRole === 'STUDENT'}
              onChange={() => setSelectedRole('STUDENT')}
            />
            <label htmlFor="studentRole">Register as Student</label>
          </div>

          <div style={radioStyle}>
            <input
              type="radio"
              id="clubAdminRole"
              name="role"
              value="CLUB_ADMIN"
              checked={selectedRole === 'CLUB_ADMIN'}
              onChange={() => setSelectedRole('CLUB_ADMIN')}
            />
            <label htmlFor="clubAdminRole">Register as Club Admin</label>
          </div>

          {selectedRole === 'CLUB_ADMIN' && (
            <>
              <input
                style={inputStyle}
                type="text"
                placeholder="Registration Code"
                value={registrationCode}
                onChange={e => setRegistrationCode(e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Club Name"
                value={clubName}
                onChange={e => setClubName(e.target.value)}
              />
              <input
                style={inputStyle}
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </>
          )}

          {selectedRole === 'STUDENT' && (
            <>
              <input
                style={inputStyle}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Department"
                value={department}
                onChange={e => setDepartment(e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={e => setRollNumber(e.target.value)}
              />
            </>
          )}
        </>
      )}

      <button
        style={buttonStyle}
        onClick={isLogin ? handleLogin : handleRegister}
        disabled={loading}
      >
        {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
      </button>

      <p
        style={toggleStyle}
        onClick={() => {
          setIsLogin(!isLogin);
          clearForm();
        }}
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Login;
