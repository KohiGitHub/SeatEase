//import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Welcome from './components/AdminHome';
import AddBlock from './components/AddBlock';
import AddFloor from './components/AddFloor';
import AddRoom from './components/AddRoom';
import AddSeat from './components/AddSeat';
import AddExam from './components/AddExam';
import AddStudent from './components/AddStudent';
import ListBlock from './components/ListBlock';
import ListFloor from './components/ListFloor';
import ListRoom from './components/ListRoom';
import ListSeat from './components/ListSeat';
import ListExams from './components/ListExams';
import ListStudents from './components/ListStudents';
import UpdateBlock from './components/UpdateBlock';
import UpdateFloor from './components/UpdateFloor';
import UpdateRoom from './components/UpdateRoom';
import UpdateSeat from './components/UpdateSeat';
import UpdateExam from './components/UpdateExam';
import UpdateStudent from './components/UpdateStudent';
import Index from './components/Index';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import GetAllSeats from './components/GetAllSeats';
import GetChart from './components/GetChart';
function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
    <Route path="/" element={<Index/>}> </Route>
    <Route path="/adminLogin" element={<AdminLogin/>}> </Route>
    <Route path="/studentLogin" element={<StudentLogin/>}> </Route>
    <Route path="/studentHome/:studentId" element={<StudentHome/>}> </Route>
    <Route path="/adminHome" element={<AdminHome/>}> </Route>
    <Route path="/addBlock" element ={<AddBlock/>}></Route>
    <Route path="/addFloor" element ={<AddFloor/>}></Route>
   
    <Route path="/addRoom" element ={<AddRoom/>}></Route>
    <Route path="/addSeat" element ={<AddSeat/>}></Route>
    <Route path="/addExam" element ={<AddExam/>}></Route>
    <Route path="/addStudent" element ={<AddStudent/>}></Route>
    <Route path="/listBlock" element ={<ListBlock/>}></Route>
    <Route path="/listFloor" element ={<ListFloor/>}></Route>
    <Route path="/listRoom" element ={<ListRoom/>}></Route>
    <Route path="/listSeat" element ={<ListSeat/>}></Route>
    <Route path="/listExam" element ={<ListExams/>}></Route>
    <Route path="/listStudent" element ={<ListStudents/>}></Route>
    <Route path="/updateBlock/:blockId" element ={<UpdateBlock/>}></Route>
    <Route path="/updateFloor/:floorId" element ={<UpdateFloor/>}></Route>
    <Route path="/updateRoom/:roomId" element ={<UpdateRoom/>}></Route>
    <Route path="/updateSeat/:seatId" element ={<UpdateSeat/>}></Route>
    <Route path="/updateExam/:examId" element ={<UpdateExam/>}></Route>
    <Route path="/updateStudent/:studentId" element ={<UpdateStudent/>}></Route>
    <Route path="/changePassword" element ={<ChangePassword/>}></Route>
    <Route path="/getAllSeats" element ={<GetAllSeats/>}></Route>
    <Route path="/getChart" element ={<GetChart/>}></Route>
    

    </Routes>
    </Router>
       
    </div>
  );
}

export default App;
