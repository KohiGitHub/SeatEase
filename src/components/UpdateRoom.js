import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/reg.css';
import { useParams } from 'react-router-dom';
const UpdateRoom = () => {
    const[roomName,setRoomName]=useState("")
    const[roomDescription,setRoomDescription]=useState("")
    const params =useParams()
    const[roomId,setRoomId]=useState(params.roomId)
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    {
    useEffect(()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken== null){
          window.location.href = 'http://localhost:3000';
         }
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        
        BlockService.getRoomById(roomId,headers).then((res)=>{
          let room=res.data;
          setRoomName(room.roomName)
          setRoomDescription(room.roomDescription)
        })
    },[])
}



        const updateRoom=(e)=>{
           e.preventDefault()
            let room={
                roomId:roomId,
                roomName:roomName,
                roomDescription:roomDescription
                }
                const jwtToken = localStorage.getItem('jwtToken');
          
                const headers = {
                  'Authorization':'Bearer '+jwtToken,
                };
                    BlockService.updateRoom(roomId,room,headers).then(resp=>{
                        setSavedSuccessfully(true);
                   })
                   
            }
        
            const goBack = () => {
                window.location.href = 'http://localhost:3000/listRoom';
              }
              const logout = () => {
                localStorage.removeItem('jwtToken');
                window.location.href = 'http://localhost:3000'; 
            };
    
    return (
        <div className="regform">
            <h1>Add Room</h1>
            {savedSuccessfully && <p className="success-message">Updated Successfully!</p>} 
            <form onSubmit={(e)=>updateRoom(e)}>
                Room Name : <input type="text" value={roomName} onChange={(e)=>setRoomName(e.target.value)}/><br/><br/>
                Room Description : <input type="text" value={roomDescription}
                onChange={(e)=>setRoomDescription(e.target.value)} /><br/><br/>
                <input type="submit" value="Save"/><br/><br/>
                <button onClick={goBack}>List Rooms</button> <br/><br/>
                <button class="logout-button"  onClick={logout}>Logout</button>

            </form>
        </div>
    );
};

export default UpdateRoom;