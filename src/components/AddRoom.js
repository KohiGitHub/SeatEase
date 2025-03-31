import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/Add.css';

const AddRoom = () => {
  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [blockId, setBlockId] = useState("");
  const [floorId, setFloorId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
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

  const saveRoom = (e) => {
    e.preventDefault();

    if (!blockId || !floorId || !roomName || !roomDescription) {
      setValidationError("All fields are required");
      return;
    }

    let room = {
      roomName: roomName,
      roomDescription: roomDescription
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.saveRoom(blockId, floorId, room, headers).then((res) => {
      setSavedSuccessfully(true);
      window.location.href = 'http://localhost:3000/addRoom';
    });
  }

  const goBack = () => {
    window.location.href = 'http://localhost:3000/adminHome';
  }

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
  };

  return (
    <div className="regform">
      <h1>Add Room</h1>
      {savedSuccessfully && <p className="success-message">Saved Successfully!</p>}
      {validationError && <p className="error-message">{validationError}</p>}
      <form onSubmit={(e) => saveRoom(e)}>
        <label> Block Name </label>
        <select value={blockId} onChange={(e) => { setBlockId(e.target.value); getFloorsByBlockId(e.target.value); }}>
          <option>Select</option>
          {blocks.map((block, index) => (
            <option key={index} value={block.blockId}>{block.blockName}</option>
          ))}
        </select>
        <br /><br />

        <label> Floor Name </label>
        <select value={floorId} onChange={(e) => setFloorId(e.target.value)}>
          <option>Select</option>
          {floors.map((floor, index) => (
            <option key={index} value={floor.floorId}>{floor.floorName}</option>
          ))}
        </select>
        <br /><br />
        Room Name : <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} /><br /><br />
        Room Description : <input type="text" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} /><br /><br />
        <input type="submit" value="Save" /><br /><br /><br /><br />
        <button className="back-button" onClick={goBack}>Back</button> <br /><br />
        <button className="logout-button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
};

export default AddRoom;