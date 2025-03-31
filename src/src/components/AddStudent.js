import React, { useEffect, useState } from 'react';
import '../css/Add.css';
import StudentService from '../service/StudentService';
import ReCAPTCHA from "react-google-recaptcha";


const AddStudent = () => {
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [semester, setSemester] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [errors, setErrors] = useState("");
  const [verified, setVerified] = useState(false);

  function onCaptchaChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };
    StudentService.getAllExams(headers)
      .then((res) => {
        setExams(res.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error scenario
      });
  }, []);

  const saveStudent = (e) => {
    e.preventDefault();

    if (
      !examId ||
      !name ||
      !age ||
      !email ||
      !phoneNo ||
      !semester ||
      !userName ||
      !password
    ) {
      setValidationError("All fields are required");
      return;
    }

    let student = {
      name: name,
      age: age,
      email: email,
      phoneNo: phoneNo,
      semester: semester,
      userName: userName,
      password: password,
      active: false,
      roles: "ROLE_USER",
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    StudentService.saveStudent(examId, student, headers)
      .then((res) => {
        setSavedSuccessfully(true);
        setValidationError('');
        setExamId('');
        setName('');
        setAge('');
        setEmail('');
        setPhoneNo('');
        setSemester('');
        setUserName('');
        setPassword('');
      })
      .catch((error) => {
        console.error(error);
        setErrors('Not saved, username would have been taken already');
        // Handle error scenario
      });
  };

  const goBack = () => {
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div className='regform'>
      <form onSubmit={(e) => saveStudent(e)}>
        <h1>ADD STUDENT</h1>
        {savedSuccessfully && <p className="success-message">Saved Successfully!</p>}
        {validationError && <p className="error-message">{validationError}</p>}
        Exam Name: <select value={examId} onChange={(e) => setExamId(e.target.value)}>
          <option>Select</option>
          {exams.map((exam, index) => (
            <option key={index} value={exam.examId}>{exam.examName}</option>
          ))}
        </select>
        <br /><br />
        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /><br /><br />
        Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        Phone Number: <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} /><br /><br />
        Semester: <select className='select' value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option>Select</option>
          <option value="1st semester">Ist Semester</option>
          <option value="2nd semester">2nd Semester</option>
          <option value="3rd semester">3rd Semester</option>
          <option value="4th semester">4th Semester</option>
        </select>
        <br /><br />
        User Name: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br /><br />
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        
      
        <input type="submit" value="Save" /><br /><br /><br /><br />
        {errors && <p className="error-message">{errors}</p>}


        <button className="logout-button" onClick={goBack}>Back</button> <br /><br />
      </form>
    </div>
  );
};

export default AddStudent;