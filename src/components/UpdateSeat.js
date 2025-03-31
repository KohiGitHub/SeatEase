import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/reg.css';
import { useParams } from 'react-router-dom';

const UpdateSeat = () => {
    const[seatName,setSeatName]=useState("")
    const[seatDescription,setSeatDescription]=useState("")
    const params =useParams()
    const[seatId,setSeatId]=useState(params.seatId)
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
        BlockService.getSeatById(seatId,headers).then((res)=>{
          let seat=res.data;
          setSeatName(seat.seatName)
          setSeatDescription(seat.seatDescription)
        })
    },[])
}



        const updateSeat=(e)=>{
           e.preventDefault()
            let seat={
                seatId:seatId,
                seatName:seatName,
                seatDescription:seatDescription
                }
                const jwtToken = localStorage.getItem('jwtToken');
          
                const headers = {
                  'Authorization':'Bearer '+jwtToken,
                };
                    BlockService.updateSeat(seatId,seat,headers).then(resp=>{
                        setSavedSuccessfully(true);
                                             
                   })
                   
            }
            const goBack = () => {
                window.location.href = 'http://localhost:3000/listSeat';
              }
              const logout = () => {
                localStorage.removeItem('jwtToken');
                window.location.href = 'http://localhost:3000'; 
            };
    

    return (
        <div className="regform">
            <h1>UPDATE SEAT</h1>
            {savedSuccessfully && <p className="success-message">Updated Successfully!</p>} 
            <form onSubmit={(e)=>updateSeat(e)}>
                Seat Name : <input type="text" value={seatName} onChange={(e)=>setSeatName(e.target.value)}/><br/><br/>
                Seat Description : <input type="text" value={seatDescription}
                onChange={(e)=>setSeatDescription(e.target.value)} /><br/><br/>
                <input type="submit" value="Save"/><br/><br/>
                <button onClick={goBack}>List Seats</button> <br/><br/>
                <button class="logout-button"  onClick={logout}>Logout</button>

            </form>
        </div>
    );
};

export default UpdateSeat;