import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/List.css';
const ListSeat = () => {

  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [blockId, setBlockId] = useState("");
  const [floorId, setFloorId] = useState("");
   const [rooms, setRooms] = useState([]);
   const [roomId, setRoomId] = useState("");
   const [seats, setSeats] = useState([]);
   const [seatId, setSeatId] = useState("");
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
   const getSeats = (blockId,floorId,roomId) => {
    const jwtToken = localStorage.getItem('jwtToken');
          
    const headers = {
      'Authorization':'Bearer '+jwtToken,
    };
    BlockService.getSeats(blockId,floorId,roomId,headers).then((res) => {
   setSeats(res.data);
   
 });
};
const  updateSeat=(seatId)=>{
    window.location.href = 'http://localhost:3000/updateSeat/'+seatId;
}
const deleteSeat=(seatId)=>{
  const confirmed = window.confirm('Are you sure you want to delete this exam?');
    if (confirmed) {

  const jwtToken = localStorage.getItem('jwtToken');
          
  const headers = {
    'Authorization':'Bearer '+jwtToken,
  };
  BlockService.deleteSeat(seatId,headers)
  .then(() => {
    window.location.href = 'http://localhost:3000/listSeat';
  })
  .catch((error) => {
    console.error(error);
    setErrors('Seat is already allocated , so cannot  be deleted');
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
           <h1>List Seats</h1> 
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
      <label> Room Name </label>
      <select value={roomId} onChange={(e) => { setRoomId(e.target.value); getSeats(blockId,floorId,e.target.value); }}>
      <option>Select</option>
        {rooms.map((room, index) => (
          <option key={index} value={room.roomId}>{room.roomName}</option>
        ))}
      </select>
      <br /><br />

           <table className="table" border="1">
            <thead>
                <tr>
                    <th>SEAT NAME</th>
                    <th>SEAT DESCRIPTION</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    seats.map(
                        seat =>
                            <tr key={seat.seatId}>
                                <td>{seat.seatName}</td>
                                <td>{seat.seatDescription}</td>
                                
                                <td>
                                   <button type="submit" onClick={()=>deleteSeat(seat.seatId)} >Delete</button>
                               </td>
                               <td>
                                   <button type="submit" onClick={()=>updateSeat(seat.seatId)}>Update</button>
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

export default ListSeat;