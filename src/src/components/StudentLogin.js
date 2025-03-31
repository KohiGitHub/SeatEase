import React, { useState } from 'react';
import StudentService from '../service/StudentService';
import '../css/Login.css';
import ReCAPTCHA from "react-google-recaptcha";

const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  function onCaptchaChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const authenticateStudent = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }

    let student = {
      username: username,
      password: password
    };

    StudentService.authenticateStudent(student)
      .then((res) => {
        const authenticationResponse = res.data;
        const token = authenticationResponse.token;
        const student = authenticationResponse.student;
        const jsonStudent = JSON.stringify(student);
        localStorage.setItem('student', jsonStudent);
        localStorage.setItem('jwtToken',token);
        window.location.href = 'http://localhost:3000/studentHome/' + student.studentId;
      })
      .catch((error) => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="regform">
      <h1>STUDENT LOGIN</h1>
      <form onSubmit={(e) => authenticateStudent(e)}>
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

export default StudentLogin;