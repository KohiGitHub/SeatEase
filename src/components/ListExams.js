import React, { useEffect, useState } from 'react';
import '../css/List.css';
import StudentService from '../service/StudentService';

const ListExams = () => {
  const [exams, setExams] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    StudentService.getAllExams().then((res) => {
      setExams(res.data);
    });
  }, []);

  const updateExam = (examId) => {
    window.location.href = 'http://localhost:3000/updateExam/' + examId;
  };

  const deleteExam = (examId) => {
    const confirmed = window.confirm('Are you sure you want to delete this exam?');
    if (confirmed) {
      const jwtToken = localStorage.getItem('jwtToken');
      const headers = {
        'Authorization': 'Bearer ' + jwtToken,
      };
      StudentService.deleteExam(examId, headers)
        .then(() => {
          window.location.href = 'http://localhost:3000/listExam';
        })
        .catch((error) => {
          console.error(error);
          setErrors('There are students registered for this exam, so cannot delete');
          // Handle error scenario
        });
    }
  };

  const goBack = () => {
    window.location.href = 'http://localhost:3000/adminHome';
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
  };

  return (
    <div>
      <div>
        <h1>LIST EXAMS</h1>
        <table className="table" border="1">
          <thead>
            <tr>
              <th>EXAM CODE</th>
              <th>EXAM NAME</th>
              <th>EXAM FEES</th>
              <th>EXAM DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.examId}>
                <td>{exam.examCode}</td>
                <td>{exam.examName}</td>
                <td>{exam.examFees}</td>
                <td>{exam.examDate}</td>
                <td>
                  <button type="button" onClick={() => deleteExam(exam.examId)}>
                    Delete
                  </button>
                  <button type="button" onClick={() => updateExam(exam.examId)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {errors && <p className="error-message">{errors}</p>}
        <button onClick={goBack}>Back</button> <br /><br />
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ListExams;
