import React, { useState } from 'react';
import AdminService from '../service/AdminService';
import '../css/Login.css';
import ReCAPTCHA from "react-google-recaptcha";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  function onCaptchaChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  
  const authenticateAdmin = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }

    let admin = {
      username: username,
      password: password
    };

    AdminService.authenticateAdmin(admin)
      .then((res) => {
        const jwtToken = res.data;
        localStorage.setItem('jwtToken', jwtToken);
        window.location.href = 'http://localhost:3000/adminHome';
      })
      .catch((error) => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="regform">
      <h1>ADMIN LOGIN</h1>
      <form onSubmit={(e) => authenticateAdmin(e)}>
        User Name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <ReCAPTCHA
          sitekey="6LcdGLgmAAAAAOw3hdjbRoAHVA2vv_1Ie2VjZ_eK"
          onChange={onCaptchaChange}
        />

        <input type="submit" value="Login" disabled={!verified}/>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminLogin;