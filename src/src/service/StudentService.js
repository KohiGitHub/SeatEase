import React, { Component } from 'react';
import axios from "axios";

const EASEAPP_URL = `http://localhost:8081/student`

class StudentService extends Component {

    saveExam(exam,headers){
        return axios.post(`${EASEAPP_URL}/saveExam`,exam,{headers});
       }
       saveStudent(examId,student){
        return axios.post(`${EASEAPP_URL}/saveStudent/`+examId,student);
       }
       getAllExams(){
        
        return axios.get(`${EASEAPP_URL}/listExam`);
       }
       getAllStudents(examId,headers){
        return axios.get(`${EASEAPP_URL}/listStudents/`+examId,{headers});
       }
       updateExam(examId,exam,headers){
       
        return axios.put(`${EASEAPP_URL}/updateExam/`+examId,exam,{headers});
       }
       getExamById(examId,headers){
         return axios.get(`${EASEAPP_URL}/getExamById/`+examId,{headers});
       }
       updateStudent(studentId,student,headers){
       
        return axios.put(`${EASEAPP_URL}/updateStudent/`+studentId,student,{headers});
       }
       getStudentById(studentId,headers){
     
         return axios.get(`${EASEAPP_URL}/getStudentById/`+studentId,{ headers });
       }
       deleteExam(examId,headers){
     
        return axios.delete(`${EASEAPP_URL}/deleteExam/`+examId,{headers});
       }
       deleteStudent(studentId,headers){
       
        return axios.delete(`${EASEAPP_URL}/deleteStudent/`+studentId,{headers});
       }
       authenticateStudent(student){
        
        return axios.post(`${EASEAPP_URL}/authenticate`,student);

       }
       generateSeat(examId,headers){
       
        return axios.get(`${EASEAPP_URL}/generateSeat/`+examId,{headers});

       }

       changePassword(passwordChangeRequest,headers){
       
        return axios.post(`${EASEAPP_URL}/changePassword`,passwordChangeRequest,{headers});

       }

       
}

export default new StudentService();