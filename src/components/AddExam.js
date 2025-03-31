import React, { useEffect, useState } from 'react';
import '../css/Add.css';
import StudentService from '../service/StudentService';

const AddExam = () => {
  const [examCode, setExamCode] = useState("");
  const [examName, setExamName] = useState("");
  const [examFees, setExamFees] = useState("");
  const [examDate, setExamDate] = useState("");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(()=>{
    const jwtToken = localStorage.getItem('jwtToken');
      
    if(jwtToken== null){
     window.location.href = 'http://localhost:3000';
    }
 },[])

  const saveExam = (e) => {
    e.preventDefault();

    if (!examCode || !examName || !examFees || !examDate) {
      setValidationError("All fields are required");
      return;
    }

    let exam = {
      examCode: examCode,
      examName: examName,
      examFees: examFees,
      examDate: examDate
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    StudentService.saveExam(exam, headers)
      .then((res) => {
        setSavedSuccessfully(true);
        window.location.href = 'http://localhost:3000/addExam';
      })
      .catch((error) => {
        console.error(error);
        // Handle error scenario
      });
  };

  const goBack = () => {
    window.location.href = 'http://localhost:3000/adminHome';
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
  };

  return (
    <div className='regform'>
      <h1>ADD EXAM</h1>
      {savedSuccessfully && <p className="success-message">Saved Successfully!</p>}
      {validationError && <p className="error-message">{validationError}</p>}
      <form onSubmit={(e) => saveExam(e)}>
        Exam Code: <input type="text" value={examCode} onChange={(e) => setExamCode(e.target.value)} /><br /><br />
        Exam Name: <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} /><br /><br />
        Exam Fee: <input type="text" value={examFees} onChange={(e) => setExamFees(e.target.value)} /><br /><br />
        Exam date: <input placeholder="YYYY-MM-DD" value={examDate} onChange={(e) => setExamDate(e.target.value)} /><br /><br />

        <input type="submit" value="Save" /><br /><br />
        <button className="back-button" onClick={goBack}>Back</button> <br /><br />
        <button className="logout-button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
};

export default AddExam;