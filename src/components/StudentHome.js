import React, { useEffect, useState } from 'react';
import StudentService from '../service/StudentService';
import { useParams } from 'react-router-dom';
import '../css/StudentHome.css';
const StudentHome = () => {
  const [student, setStudent] = useState();
  const [name, setName] = useState('');
  const [examName, setExamName] = useState('');
  const [examFees, setExamFees] = useState('');
  const [examDate, setExamDate] = useState('');
  const [seatName, setSeatName] = useState('');
  const [seatDescription, setSeatDescription] = useState('');
  const params = useParams();
  const [studentId, setStudentId] = useState(params.studentId);
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
          
    if(jwtToken== null){
     window.location.href = 'http://localhost:3000';
    }

      let st = localStorage.getItem('student');
      if(st== null){
        window.location.href = 'http://localhost:3000';
       }
      const student = JSON.parse(st);

     
      setStudent(student);
      setName(student.name);
      setExamName(student.exam.examName);
      setExamFees(student.exam.examFees);
      setExamDate(student.exam.examDate);

      if (student && student.seat) {
        setSeatName(student.seat.seatName);
        setSeatDescription(student.seat.seatDescription);
        setMessage('');
      } else {
        setSeatName('');
        setSeatDescription('');
        setMessage('Seat information not found.Please pay the fees if you have not paid');
      }
    
  }, []);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
};
const changePassword = () => {
  window.location.href = 'http://localhost:3000/changePassword'; // Redirect to the login page or home page
};


  return (
    <div class="container">
      <h1>
        Dear {name}, you have registered for {examName} in {examDate}
      </h1>
      {student && student.seat ? (
        <h1>
          Your seat Name is {seatName} ({seatDescription})
        </h1>
      ) : (
        <h1>{message}</h1>
      )}
               <button onClick={changePassword}className="button-primary">Change Password</button>
         <button class="logout-button"  onClick={logout}>Logout</button>
    </div>
  );
};

export default StudentHome;