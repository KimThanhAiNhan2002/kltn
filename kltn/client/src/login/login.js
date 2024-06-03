import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Login failed');
    }
  };

  return (
<div style={{background:'white'}} class="p-3 p-sm-5 justify-content-center">
    <div class="row g-4 g-xl-5 justify-content-center">
        <div class="col-xl-5 d-flex justify-content-center">
            <div class="authentication-wrap overflow-hidden position-relative text-center text-sm-start my-5">
              
                <div class="mb-5">
                    <h2 class="display-6 fw-semibold mb-3">Welcome back! Please <span class="font-caveat text-primary">Sign in</span> to continue.</h2>
                    <p class="mb-0">Unlock a world of exclusive content, enjoy special offers, and be the first to dive into exciting news and updates by joining our community!</p>
                </div>            
                <form onSubmit={handleLogin} class="register-form">
                  
                    <div class="form-group mb-4">
                        <label class="required">Tên Tài Khoản</label>
                        <input style={{background:'white'}} type="text"  value={username} onChange={(e) => setUsername(e.target.value)} class="form-control "/>
                        <div class="invalid-feedback text-start">Enter your valid email</div>
                    </div>
                   
                    <div class="form-group mb-4">
                        <label class="required">Mật Khẩu</label>
                        <input style={{background:'white'}} id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control password" autocomplete="off"/>
                        <i data-bs-toggle="#password" class="fa-regular fa-eye-slash toggle-password"></i>
                    </div>
                   
                   
                    <button type="submit" class="btn btn-primary btn-lg w-100">Đăng Nhập</button>
                  
                </form>
               
            </div>
        </div>
       
    </div>
</div>
  );
};

export default Login;
