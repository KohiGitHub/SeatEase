import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/Add.css';

const AddBlock = () => {
  const [blockName, setBlockName] = useState("");
  const [blockDescription, setBlockDescription] = useState("");
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    const jwtToken = localStorage.getItem('jwtToken');
      
    if(jwtToken== null){
     window.location.href = 'http://localhost:3000';
    }
 },[])
  const saveBlock = (e) => {
    e.preventDefault();

    // Validate the form fields before submitting
    const formErrors = {};
    if (blockName.trim() === "") {
      formErrors.blockName = "Block Name is required";
    }
    if (blockDescription.trim() === "") {
      formErrors.blockDescription = "Block Description is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Form fields are valid, proceed with saving the block
    const block = {
      blockName: blockName,
      blockDescription: blockDescription
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };

    BlockService.saveBlock(block, headers)
      .then((res) => {
        setSavedSuccessfully(true);
        window.location.href = 'http://localhost:3000/addBlock';
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
      <h1>ADD BLOCK</h1>
      {savedSuccessfully && <p className="success-message">Saved Successfully!</p>}
      <form onSubmit={saveBlock}>
        Block Name:
        <input type="text" value={blockName} onChange={(e) => setBlockName(e.target.value)} />
        {errors.blockName && <p className="error-message">{errors.blockName}</p>}

        Block Description:
        <input type="text" value={blockDescription} onChange={(e) => setBlockDescription(e.target.value)} />
        {errors.blockDescription && <p className="error-message">{errors.blockDescription}</p>}

        <input type="submit" value="Save" /><br /><br /><br /><br />
        <button className="back-button" onClick={goBack}>Back</button> <br /><br />
        <button className="logout-button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
};

export default AddBlock;