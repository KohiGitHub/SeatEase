import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/reg.css';
import { useParams } from 'react-router-dom';
const UpdateFloor = () => {
    const[floorName,setFloorName]=useState("")
    const[floorDescription,setFloorDescription]=useState("")
    const params =useParams()
    const[floorId,setfloorId]=useState(params.floorId)
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    useEffect(()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken== null){
          window.location.href = 'http://localhost:3000';
         }
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        BlockService.getFloorById(floorId,headers).then((res)=>{
          let floor=res.data;
          setFloorName(floor.floorName)
          setFloorDescription(floor.floorDescription)
        })
    },[])



        const updateFloor=(e)=>{
           e.preventDefault()
            let floor={
                floorId:floorId,
                floorName:floorName,
                floorDescription:floorDescription
                }
                const jwtToken = localStorage.getItem('jwtToken');
          
                const headers = {
                  'Authorization':'Bearer '+jwtToken,
                };
                    BlockService.updateFloor(floorId,floor,headers).then(resp=>{
                    setSavedSuccessfully(true);
                   })
                   
            }
            const goBack = () => {
                window.location.href = 'http://localhost:3000/listFloor';
              }
              const logout = () => {
                localStorage.removeItem('jwtToken');
                window.location.href = 'http://localhost:3000'; 
            };
            
    return (
        <div className="regform">
            <h1>EDIT Floor</h1>
            {savedSuccessfully && <p className="success-message">Updated Successfully!</p>} 
            <form onSubmit={(e)=>updateFloor(e)}>
                Floor Name : <input type="text" value={floorName} onChange={(e)=>setFloorName(e.target.value)}/><br/><br/>
                Floor Description : <input type="text" value={floorDescription}
                onChange={(e)=>setFloorDescription(e.target.value)} /><br/><br/>
                <input type="submit" value="Save"/><br/><br/>
                <button onClick={goBack}>List Floors</button> <br/><br/>
                <button class="logout-button"  onClick={logout}>Logout</button>

            </form>
        </div>
    );
};

export default UpdateFloor;