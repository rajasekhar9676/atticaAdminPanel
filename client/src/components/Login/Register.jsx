import React, { useState } from 'react';
import {BASE_URL} from '../../constant'
import axios from 'axios'
import './Register.css';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername]=useState('')
  const [mobile,setMobile]=useState('')
  const navigate=  useNavigate()
  const [error, setError] = useState(null);

//   const [confirmPassword, setConfirmPassword] = useState('');

const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, {
        username, email, password,mobile
      });

      console.log('Registration successful', response.data);
      navigate('/'); // Correct usage of navigate to redirect to login page
    } catch (error) {
      console.log('Error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
    <div className="register-box">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
            <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <input
          type="number"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
  );
};

export default Register;
