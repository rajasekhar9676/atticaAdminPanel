import React, { useState } from 'react';
import './Login.css';
import axios from 'axios'
import { BASE_URL } from '../../constant';
import { useNavigate } from 'react-router-dom';
// import Dashboard from '../Dashboard/Dashboard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const [error,setError]=useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post(`${BASE_URL}/api/users/login`,{
        email,password
      })
     navigate('/dashboard')
    console.log('Login Succeful',response.data)
    console.log('Email:', email);
    console.log('Password:', password);
    }
    catch(error){
      console.log('Error',error.response?.data?.message)
      setError(error.response?.data?.message || 'Login Failed')
    }
    
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome</h2>
        <div className="logo">A</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password">👁️</span>
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className='error'>{error}</p>}
        <p>
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
