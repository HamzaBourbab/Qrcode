import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import user_icons from '../Assest/person.png';
import email_icons from '../Assest/email.png';
import password_icons from '../Assest/password.png';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function Login() {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // Assuming you have AuthContext

  const handleSubmit = async () => {
    if (action === "Login") {
      if (email && password) {
        try {
          const response = await axios.post('http://localhost:5000/api/login', {
            email,
            password,
          });

          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            login();
            navigate('/');
          } else {
            alert("Invalid credentials, please try again.");
          }
        } catch (error) {
          console.error(error);
          alert("Login failed. Please try again.");
        }
      } else {
        alert("Please enter email and password.");
      }
    } else {
      if (name && email && password) {
        try {
          const response = await axios.post('http://localhost:5000/api/signup', {
            name,
            email,
            password,
          });

          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            login();
            navigate('/');
          } else {
            alert("Signup failed. Please try again.");
          }
        } catch (error) {
          console.error(error);
          alert("Signup failed. Please try again.");
        }
      } else {
        alert("Please fill all fields.");
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icons} alt="user" />
            <input
              type="text"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icons} alt="email" />
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icons} alt="password" />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Lost password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      <div className="submit" onClick={handleSubmit}>
        Welcome
      </div>
    </div>
  );
}

export default Login;
