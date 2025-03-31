import React, { useEffect } from 'react';
import '../css/AdminHome.css';

const AdminHome = () => {
    useEffect(()=>{
        const jwtToken = localStorage.getItem('jwtToken');
          
        if(jwtToken== null){
         window.location.href = 'http://localhost:3000';
        }
     },[])

    const addBlock = () => {
        window.location.href = 'http://localhost:3000/addBlock';
    }
    const addFloor = () => {
        window.location.href = 'http://localhost:3000/addFloor';
    }
    const addRoom = () => {
        window.location.href = 'http://localhost:3000/addRoom';
    }
    const addSeat = () => {
        window.location.href = 'http://localhost:3000/addSeat';
    }
    const addExam = () => {
        window.location.href = 'http://localhost:3000/addExam';
    }
    
    const listBlock = () => {
        window.location.href = 'http://localhost:3000/listBlock';
    }
    const listFloor = () => {
        window.location.href = 'http://localhost:3000/listFloor';
    }
    const listRoom = () => {
        window.location.href = 'http://localhost:3000/listRoom';
    }
    const listSeat = () => {
        window.location.href = 'http://localhost:3000/listSeat';
    }
    const listExam = () => {
        window.location.href = 'http://localhost:3000/listExam';
    }
    const listStudent = () => {
        window.location.href = 'http://localhost:3000/listStudent';
    }
    const getAllSeats = () => {
        window.location.href = 'http://localhost:3000/getAllSeats';
    }
    const getChart= () => {
        window.location.href = 'http://localhost:3000/getChart';
    }
    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = 'http://localhost:3000'; 
    };


    return (
        <div class="container">
        <h1 >Welcome Admin</h1>
        <div  class="button-container">
        
        <div class="column">
        <button  onClick={addBlock} >Add Blocks</button> <br/><br/>
        <button  onClick={addFloor}>Add Floors</button><br/><br/>
        <button onClick={addRoom} >Add Rooms</button><br/><br/>
        <button onClick={addSeat}>Add seats</button><br/><br/>
        <button onClick={addExam}>Add Exam</button><br/><br/>
        </div>
        <div class="column">
    <div container="list">
        
        <button onClick={listBlock}>List Block</button><br/><br/>
        <button onClick={listFloor}>List Floor</button><br/><br/>
        <button onClick={listRoom}>List Room</button><br/><br/>
        <button onClick={listSeat}>List Seat</button><br/><br/>
        <button onClick={listExam}>List Exam</button><br/><br/>
        <button onClick={listStudent}>List Student</button><br/><br/>
         <button onClick={getAllSeats}>Seat Allocation Report</button><br/><br/>
         <button onClick={getChart}>Graphical Seat Representation</button><br/><br/>
        <button class="logout-button" onClick={logout}>Logout</button>
        </div>
        </div>
  </div>
  </div>

    );
};

export default AdminHome;