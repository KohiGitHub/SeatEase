import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/List.css';
const ListFloor = () => {

    const[blocks,setBlocks]=useState([])
    const[blockId,setBlockId]=useState("")
    const [floors, setFloors] = useState([]);
    const [floorId, setFloorId] = useState("");
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
      const  updateFloor=(floorId)=>{
       
        window.location.href = 'http://localhost:3000/updateFloor/'+floorId;
    }
    const deleteFloor=(floorId)=>{
      const confirmed = window.confirm('Are you sure you want to delete this exam?');
    if (confirmed) {

        const jwtToken = localStorage.getItem('jwtToken');
          
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        
        BlockService.deleteFloor(floorId,headers)
        .then(() => {
          window.location.href = 'http://localhost:3000/listFloor';
        })
        .catch((error) => {
          console.error(error);
          setErrors('There are rooms added in this block, so cannot  be deleted');
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
        <div>
           
            <div className="list-container" >
           
           <h1>List Floors</h1> 
           <label> Block Name </label>
      <select value={blockId} onChange={(e) => { setBlockId(e.target.value); getFloorsByBlockId(e.target.value); }}>
      <option>Select</option>
        {blocks.map((block, index) => (
          <option key={index} value={block.blockId}>{block.blockName}</option>
        ))}
      </select>
      
      <br /><br />
     
           <table className="table" border="1">
            <thead>
                <tr>
                    <th>Floor Name</th>
                    <th>Floor Decription</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    floors.map(
                        floor =>
                            <tr key={floor.floorId}>
                                
                                <td>{floor.floorName}</td>
                                <td>{floor.floorDescription}</td>
                               
                                <td>
                                   <button type="submit" onClick={()=>deleteFloor(floor.floorId)}>Delete</button>
                               </td>
                               <td>
                                   <button type="submit" onClick={()=>updateFloor(floor.floorId)} >Update</button>
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

export default ListFloor;