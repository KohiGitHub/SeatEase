import React, { useEffect, useState } from 'react';
import '../css/List.css';
import StudentService from '../service/StudentService';
const ListStudents = () => {

    const[exams,setExams]=useState([])
    const[students,setStudents]=useState([])
    const[examId,setExamId]=useState("")
    const[studentId,setStudentId]=useState("")

    useEffect(()=>{
     
        StudentService.getAllExams().then((res)=>{
             
            setExams(res.data)
                  })
     },[])

     const getAllStudents = (examId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken== null){
          window.location.href = 'http://localhost:3000';
         }
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
         StudentService.getAllStudents(examId,headers).then((res) => {
            setStudents(res.data);

                 });
      };
      const  updateStudent=(studentId)=>{
        window.location.href = 'http://localhost:3000/updateStudent/'+studentId;
    }
    const deleteStudent=(studentId)=>{
      const confirmed = window.confirm('Are you sure you want to delete this exam?');
    if (confirmed) {

        const jwtToken = localStorage.getItem('jwtToken');
          
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        StudentService.deleteStudent(studentId,headers)
        window.location.href = 'http://localhost:3000/listStudent';
      }
    }
      const goBack = () => {
        window.location.href = 'http://localhost:3000/adminHome';
      }
      const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
    };

    return (
        <div className="list-container">
           
            <div>
           <h1>LIST STUDENTS</h1> 
           <label> Exam Name </label>
      <select value={examId} onChange={(e) => { setExamId(e.target.value); getAllStudents(e.target.value); }}>
      <option>Select</option>
        {exams.map((exam, index) => (
          <option key={index} value={exam.examId}>{exam.examName}</option>
        ))}
      </select>
      <br /><br />
           <table className="table" border="1">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>AGE</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                    <th>SEMESTER</th>
                    <th>SEAT ALLOCATED</th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map(
                        student =>
                            <tr key={student.studentId}>
                                
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.email}</td>
                                <td>{student.phoneNo}</td>
                                <td>{student.semester}</td>
                                <td> {student.active ? 'Yes' : 'No'}</td>
                                
                                <td>
                                   <button type="submit" onClick={()=>deleteStudent(student.studentId)}>Delete</button>
                               </td>
                               <td>
                                   <button type="submit" onClick={()=>updateStudent(student.studentId)}>Update</button>
                               </td>

                            </tr>
                    )
                }
            </tbody>
        </table>
        <button onClick={goBack}>Back</button> <br/><br/>
        <button class="logout-button"  onClick={logout}>Logout</button>

        </div>

        </div>
    );
};

export default ListStudents;