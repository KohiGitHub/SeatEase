import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/List.css';
const ListRoom = () => {

  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [blockId, setBlockId] = useState("");
  const [floorId, setFloorId] = useState("");
   const [rooms, setRooms] = useState([]);
   const [roomId, setRoomId] = useState("");
   const [errors, setErrors] = useState("");

    useEffect(()=>{
      const jwtToken = localStorage.getItem('jwtToken');
      if(jwtToken== null){
        window.location.href = 'http://localhost:3000';
       }
      const headers = {
        'Authorization':'Bearer '+jwtToken,
      };
        BlockService.getAllBlocks(headers).then((res)=>{
             
            setBlocks(res.data)
                  })
     },[])
     const getFloorsByBlockId = (blockId) => {
      const jwtToken = localStorage.getItem('jwtToken');
          
      const headers = {
        'Authorization':'Bearer '+jwtToken,
      };
        BlockService.getFloorsByBlockId(blockId,headers).then((res) => {
          setFloors(res.data);
          console.log(res.data);
        });
      };
      const getRoomsByBlockIdAndFloorId = (blockId,floorId) => {
        const jwtToken = localStorage.getItem('jwtToken');
          
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        BlockService.getRoomsByBlockIdAndFloorId(blockId,floorId,headers).then((res) => {
       setRooms(res.data);
       
     });
   };
   const  updateRoom=(roomId)=>{
       
    window.location.href = 'http://localhost:3000/updateRoom/'+roomId;
}
const deleteRoom=(roomId)=>{
  const confirmed = window.confirm('Are you sure you want to delete this exam?');
    if (confirmed) {
      
  const jwtToken = localStorage.getItem('jwtToken');
          
  const headers = {
    'Authorization':'Bearer '+jwtToken,
  };
  BlockService.deleteRoom(roomId,headers)
  .then(() => {
    window.location.href = 'http://localhost:3000/listRoom';
  })
  .catch((error) => {
    console.error(error);
    setErrors('There are seats added in this block, so cannot  be deleted');
    // Handle error scenario
  });
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
           <h1>List Rooms</h1> 
           <label> Block Name </label>
      <select value={blockId} onChange={(e) => { setBlockId(e.target.value); getFloorsByBlockId(e.target.value); }}>
      <option>Select</option>
        {blocks.map((block, index) => (
          <option key={index} value={block.blockId}>{block.blockName}</option>
        ))}
      </select>
      <br /><br />
      
      <label> Floor Name </label>
      <select value={floorId} onChange={(e) => { setFloorId(e.target.value); getRoomsByBlockIdAndFloorId(blockId,e.target.value); }}>
      <option>Select</option>
        {floors.map((floor, index) => (
          <option key={index} value={floor.floorId}>{floor.floorName}</option>
        ))}
      </select>
      <br /><br />

           <table className="table" border="1">
            <thead>
                <tr>
                    <th>ROOM NAME</th>
                    <th>ROOM DESCRIPTION</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    rooms.map(
                        room =>
                            <tr key={room.roomId}>
                                
                                <td>{room.roomName}</td>
                                <td>{room.roomDescription}</td>
                               
                                <td>
                                   <button type="submit" onClick={()=>deleteRoom(room.roomId)} >Delete</button>
                               </td>
                               <td>
                                   <button type="submit" onClick={()=>updateRoom(room.roomId)}>Update</button>
                               </td>

                            </tr>
                    )
                }
            </tbody>
        </table>
        {errors && <p className="error-message">{errors}</p>}
        <button onClick={goBack}>Back</button> <br/><br/>
        <button class="logout-button"  onClick={logout}>Logout</button>

        </div>

        </div>
    );
};

export default ListRoom;