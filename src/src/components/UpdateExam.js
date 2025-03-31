import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/reg.css';
import { useParams } from 'react-router-dom';
import StudentService from '../service/StudentService';

const UpdateExam = () => {
    const[examCode,setExamCode]=useState("")
    const[examName,setExamName]=useState("")
    const[examFees,setExamFees]=useState("")
    const[examDate,setExamDate]=useState("")
    const params =useParams()
    const[examId,setExamId]=useState(params.examId)
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    useEffect(()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken== null){
          window.location.href = 'http://localhost:3000';
         }
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        StudentService.getExamById(examId,headers).then((res)=>{
          let exam=res.data;
          setExamCode(exam.examCode)
          setExamName(exam.examName)
          setExamFees(exam.examFees)
          setExamDate(exam.examDate)
        })
    },[])



        const updateExam=(e)=>{
           e.preventDefault()
            let exam={
                examId:examId,
                examCode:examCode,
                examName:examName,
                examFees:examFees,
                examDate:examDate
                }
                const jwtToken = localStorage.getItem('jwtToken');
          
                const headers = {
                  'Authorization':'Bearer '+jwtToken,
                };
                   StudentService.updateExam(examId,exam,headers).then(resp=>{
                    setSavedSuccessfully(true);
                   })
                   
            }
            const goBack = () => {
              window.location.href = 'http://localhost:3000/listExam';
            }
            const logout = () => {
              localStorage.removeItem('jwtToken');
              window.location.href = 'http://localhost:3000'; 
          };
  

    return (
        <div className='regform'>
           <h1>Update EXAM</h1>
           {savedSuccessfully && <p className="success-message">Updated Successfully!</p>}  
           <form onSubmit={(e)=>updateExam(e)}>
           Exam Code: <input type="text" value={examCode}
            onChange={(e)=>setExamCode(e.target.value)}/><br/><br/>
             Exam Name: <input type="text" value={examName}
            onChange={(e)=>setExamName(e.target.value)}/><br/><br/>
             Exam Fee: <input type="text" value={examFees}
            onChange={(e)=>setExamFees(e.target.value)}/><br/><br/>
             Exam date: <input placeholder="YYYY-MM-DD" value={examDate}
            onChange={(e)=>setExamDate(e.target.value)}/><br/><br/>

            <input type="submit" value="Save"/> <br/><br/>
            <button onClick={goBack}>List Exams</button> <br/><br/>
             <button class="logout-button"  onClick={logout}>Logout</button>

           </form>
        </div>
    );
};

export default UpdateExam;