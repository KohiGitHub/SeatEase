import React, { useEffect, useState } from 'react';
import '../css/reg.css';
import { useParams } from 'react-router-dom';
import StudentService from '../service/StudentService';

const UpdateStudent = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState();
    const [semester, setSemester] = useState("");
    const [active, setActive] = useState(false);
    const [feeReceiptNumber, setFeeReceiptNumber] = useState("");
    const [seatName, setSeatName] = useState("");
    const params = useParams();
    const [studentId, setStudentId] = useState(params.studentId);
    const [exam, setExam] = useState();
    const [examId, setExamId] = useState();
    const [seat, setSeat] = useState();
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);
    const [isGenerateButtonEnabled, setIsGenerateButtonEnabled] = useState(false);
    const [isFeesPaidEnabled, setIsFeesPaidEnabled] = useState(false);

    useEffect(() => {
        if (studentId) {
            fetchData();
        }
    }, [studentId]);

    useEffect(() => {
        // Check if the fee receipt number is entered by the user
      //  setIsFeesPaidEnabled(feeReceiptNumber.trim().length > 0);
        setIsFeesPaidEnabled(feeReceiptNumber !== null && feeReceiptNumber.trim().length > 0);

    }, [feeReceiptNumber]);

    useEffect(() => {
        // Check if both "active" and "feeReceiptNumber" fields are entered by the user
//        const isButtonEnabled = active && feeReceiptNumber.trim().length > 0;
        const isButtonEnabled = active && (feeReceiptNumber !== null && feeReceiptNumber.trim().length > 0);

        setIsGenerateButtonEnabled(isButtonEnabled);
    }, [active, feeReceiptNumber]);

    const fetchData = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken == null) {
                window.location.href = 'http://localhost:3000';
            }
            const headers = {
                'Authorization': 'Bearer ' + jwtToken,
            };

            const res = await StudentService.getStudentById(studentId, headers);

            const student = res.data;
            setName(student.name);
            setAge(student.age);
            setEmail(student.email);
            setPhoneNo(student.phoneNo);
            setSemester(student.semester);
            setActive(student.active);
            setFeeReceiptNumber(student.feeReceiptNumber);
            if (student.seat) {
                setSeatName(student.seat.seatName);
            }
            setExam(student.exam);
            setExamId(student.exam.examId);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateStudent = (e) => {
        e.preventDefault();
        let student = {
            studentId: studentId,
            name: name,
            age: age,
            email: email,
            phoneNo: phoneNo,
            semester: semester,
            active: active,
            feeReceiptNumber: feeReceiptNumber,
            seatName: seatName,
            seat: seat
        };
        const jwtToken = localStorage.getItem('jwtToken');

        const headers = {
            'Authorization': 'Bearer ' + jwtToken,
        };

        StudentService.updateStudent(studentId, student, headers)
            .then(resp => {
                setSavedSuccessfully(true);
                // window.location.href = 'http://localhost:3000/updateStudent/' + studentId;
            })
            .catch(error => {
                console.error('Error updating student:', error);
            });
    };

    const generateSeat = (e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken');

        const headers = {
            'Authorization': 'Bearer ' + jwtToken,
        };

        StudentService.generateSeat(examId, headers)
            .then(resp => {
                const seat = resp.data;
                setSeat(seat);
                setSeatName(seat.seatName);
            })
            .catch(error => {
                console.error('Error generating seat:', error);
            });
    };

    const goBack = () => {
        window.location.href = 'http://localhost:3000/listStudent';
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = 'http://localhost:3000';
    };

    return (
        <div className='regform'>
            <form onSubmit={updateStudent}>
                <h1>UPDATE STUDENT</h1>
                Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /><br /><br />
                Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                Phone Number: <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} /><br /><br />

                ExamId: <input type="text" value={examId} onChange={(e) => setExamId(e.target.value)} /><br /><br />
                Semester:
                <select className='select' value={semester} onChange={(e) => setSemester(e.target.value)}>
                    <option>Select</option>
                    <option value="1st semester">1st Semester</option>
                    <option value="2nd semester">2nd Semester</option>
                    <option value="3rd semester">3rd Semester</option>
                    <option value="4th semester">4th Semester</option>
                </select><br /><br />
                Fee Receipt Number: <input type="text" value={feeReceiptNumber} onChange={(e) => setFeeReceiptNumber(e.target.value)} /><br /><br />
                Fees paid: <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} disabled={!isFeesPaidEnabled} /><br /><br />
               
                <button onClick={generateSeat} disabled={!isGenerateButtonEnabled}>Generate Seat</button>
                <input type="text" value={seatName} onChange={(e) => setSeatName(e.target.value)} /><br /><br />
                <input type="submit" value="Save" /><br /><br />
                {savedSuccessfully && <p className="success-message">Updated Successfully!</p>}
                <button onClick={goBack}>List Students</button> <br /><br />
                <button className="logout-button" onClick={logout}>Logout</button>

            </form>
        </div>
    );
};

export default UpdateStudent;
