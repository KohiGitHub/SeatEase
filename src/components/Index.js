import React from 'react';
import '../css/Index.css';

const Index = () => {
    const adminLogin = () => {
        window.location.href = 'http://localhost:3000/adminLogin';
    }
    const studentLogin = () => {
        window.location.href = 'http://localhost:3000/studentLogin';
    }
    const addStudent = () => {
        window.location.href = 'http://localhost:3000/addStudent';
    }
    return (
        <div class="container">
             <h1>WELCOME TO SEATEASE</h1>
        <div className="index">
           
        <button  onClick={adminLogin} > Admin Login</button> <br/><br/>
        <button  onClick={studentLogin}>Student Login</button><br/><br/>
        <button onClick={addStudent}>Add Student</button><br/><br/>
        </div>
        </div>
    );
};

export default Index;