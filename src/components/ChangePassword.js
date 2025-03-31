import React, { useState } from 'react';
import '../css/Login.css';
import StudentService from '../service/StudentService';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [error, setError] = useState('');

  const changePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    let passwordChangeRequest = {
      username: username,
      password: password,
      newPassword: newPassword,
      repeatNewPassword: confirmNewPassword
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    StudentService.changePassword(passwordChangeRequest, headers)
      .then((res) => {
        setSavedSuccessfully(true);
        setError('')
        localStorage.removeItem('jwtToken');
      })
      .catch((error) => {
        console.error(error);
        setError('Your old password or username is incorrect.');
        // Handle error scenario
      });
  };

  const goHome = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div className="regform">
      <h1>Change Password</h1>
      {savedSuccessfully && <p className="success-message">Password Changed Successfully. Login with the new password.</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={(e) => changePassword(e)}>
        User Name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        Current Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        New Password: <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br /><br />
        Confirm New Password: <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /><br /><br />

        <input type="submit" value="Change Password" />
      </form>
      <button onClick={goHome}>Home</button> <br /><br />
    </div>
  );
};

export default ChangePassword;
