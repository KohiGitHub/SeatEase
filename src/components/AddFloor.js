import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/Add.css';

const AddFloor = () => {
  const [blocks, setBlocks] = useState([]);
  const [blockId, setBlockId] = useState("");
  const [floorName, setFloorName] = useState("");
  const [floorDescription, setFloorDescription] = useState("");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null) {
      window.location.href = 'http://localhost:3000';
    }

    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.getAllBlocks(headers)
      .then((res) => {
        setBlocks(res.data);
      });
  }, []);

  const saveFloor = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (blockId.trim() === "" || floorName.trim() === "" || floorDescription.trim() === "") {
      setErrorMessage("Please fill in all required fields.");
      return; // Do not proceed with saving if any field is empty
    }

    const floor = {
      floorName: floorName,
      floorDescription: floorDescription
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.saveFloor(blockId, floor, headers)
      .then((res) => {
        setSavedSuccessfully(true);
        window.location.href = 'http://localhost:3000/addFloor';
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
      <h1>Add Floor</h1>
      {savedSuccessfully && <p className="success-message">Saved Successfully!</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={saveFloor}>
        Block Name:
        <select value={blockId} onChange={(e) => setBlockId(e.target.value)}>
          <option>Select</option>
          {blocks.map((block, index) => (
            <option key={index} value={block.blockId}>{block.blockName}</option>
          ))}
        </select>
        <br /><br />
        Floor Name: <input type="text" value={floorName}
          onChange={(e) => setFloorName(e.target.value)} /><br /><br />
        Floor Description: <input type="text" value={floorDescription}
          onChange={(e) => setFloorDescription(e.target.value)} /><br /><br />
        <input type="submit" value="Save" /><br /><br /><br /><br />
        <button className="back-button" onClick={goBack}>Back</button> <br /><br />
        <button className="logout-button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
};

export default AddFloor;