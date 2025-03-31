import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/Add.css';

const AddSeat = () => {
  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [blockId, setBlockId] = useState("");
  const [floorId, setFloorId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [seatName, setSeatName] = useState("");
  const [seatDescription, setSeatDescription] = useState("");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null) {
      window.location.href = 'http://localhost:3000';
    }
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.getAllBlocks(headers).then((res) => {
      let block = res.data;
      setBlocks(block);
    });
  }, []);

  const getFloorsByBlockId = (blockId) => {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.getFloorsByBlockId(blockId, headers).then((res) => {
      setFloors(res.data);
    });
  };

  const getRoomsByBlockIdAndFloorId = (blockId, floorId) => {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.getRoomsByBlockIdAndFloorId(blockId, floorId, headers).then((res) => {
      setRooms(res.data);
    });
  };

  const saveSeat = (e) => {
    e.preventDefault();

    if (!blockId || !floorId || !roomId || !seatName || !seatDescription) {
      setValidationError("All fields are required");
      return;
    }

    let seat = {
      seatName: seatName,
      seatDescription: seatDescription
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.saveSeat(blockId, floorId, roomId, seat, headers).then((res) => {
      setSavedSuccessfully(true);
      window.location.href = 'http://localhost:3000/addSeat';
    });
  };

  const goBack = () => {
    window.location.href = 'http://localhost:3000/adminHome';
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
  };

  return (
    <div className="regform">
      <h1>Add seats</h1>
      {savedSuccessfully && <p className="success-message">Saved Successfully!</p>}
      {validationError && <p className="error-message">{validationError}</p>}
      <form onSubmit={(e) => saveSeat(e)}>
        <label> Block Name </label>
        <select value={blockId} onChange={(e) => { setBlockId(e.target.value); getFloorsByBlockId(e.target.value); }}>
          <option>Select</option>
          {blocks.map((block, index) => (
            <option key={index} value={block.blockId}>{block.blockName}</option>
          ))}
        </select>
        <br /><br />

        <label> Floor Name </label>
        <select value={floorId} onChange={(e) => { setFloorId(e.target.value); getRoomsByBlockIdAndFloorId(blockId, e.target.value); }}>
          <option>Select</option>
          {floors.map((floor, index) => (
            <option key={index} value={floor.floorId}>{floor.floorName}</option>
          ))}
        </select>
        <br /><br />

        <label> Room Name </label>
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option>Select</option>
          {rooms.map((room, index) => (
            <option key={index} value={room.roomId}>{room.roomName}</option>
          ))}
        </select>
        <br /><br />

        Seat Name : <input type="text" value={seatName} onChange={(e) => setSeatName(e.target.value)} /><br /><br />
        Seat Description : <input type="text" value={seatDescription} onChange={(e) => setSeatDescription(e.target.value)} /><br /><br />
        <input type="submit" value="Save" /><br /><br /><br /><br />
        <button className="back-button" onClick={goBack}>Back</button> <br /><br />
        <button className="logout-button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
};

export default AddSeat;