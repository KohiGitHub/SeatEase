import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/reg.css';
import { useParams } from 'react-router-dom';
const UpdateBlock = () => {
    const[blockName,setBlockName]=useState("")
    const[blockDescription,setBlockDescription]=useState("")
    const params =useParams()
    const[blockId,setBlockId]=useState(params.blockId)
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    useEffect(()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken== null){
          window.location.href = 'http://localhost:3000';
         }
        const headers = {
          'Authorization':'Bearer '+jwtToken,
        };
        BlockService.getBlockById(blockId,headers).then((res)=>{
          let block=res.data;
          setBlockName(block.blockName)
          setBlockDescription(block.blockDescription)
        })
    },[])



        const updateBlock=(e)=>{
           e.preventDefault()
            let block={
                blockId:blockId,
                blockName:blockName,
                blockDescription:blockDescription
                }
                const jwtToken = localStorage.getItem('jwtToken');
          
                const headers = {
                  'Authorization':'Bearer '+jwtToken,
                };
                   //alert(employee.name +" : "+employee.address.city)
                   BlockService.updateBlock(blockId,block,headers).then(resp=>{
                    setSavedSuccessfully(true);
                   
                   })
                   
            }
            const goBack = () => {
              window.location.href = 'http://localhost:3000/listBlock';
            }
            const logout = () => {
              localStorage.removeItem('jwtToken');
              window.location.href = 'http://localhost:3000'; 
          };
  

    return (
        <div className="regform">
            <h1>Edit Block</h1>
            {savedSuccessfully && <p className="success-message">Updated Successfully!</p>} 
            <form onSubmit={(e)=>updateBlock(e)}>
                Block Name : <input type="text" value={blockName} onChange={(e)=>setBlockName(e.target.value)}/><br/><br/>
                Block Description : <input type="text" value={blockDescription}
                onChange={(e)=>setBlockDescription(e.target.value)} /><br/><br/>
                <input type="submit" value="Save"/><br/><br/>
                <button onClick={goBack}>List Blocks</button> <br/><br/>
                <button class="logout-button"  onClick={logout}>Logout</button>

            </form>
        </div>
    );
};

export default UpdateBlock;