import React, { Component } from 'react';
import axios from "axios";

const EASEAPP_URL = `http://localhost:8081/block`

class BlockService extends Component {

    getAllBlocks(headers){
        
     return axios.get(`${EASEAPP_URL}/list`,{headers});
    }
    saveBlock(block,headers){
          return axios.post(`${EASEAPP_URL}/addBlock`,block,{headers});
       }
       saveFloor(blockId,floor,headers){
        return axios.post(`${EASEAPP_URL}/saveFloor/`+blockId,floor,{headers});
       }
      
       saveRoom(blockId, floorId, room,headers) {
        return axios.post(`${EASEAPP_URL}/saveRoom/${blockId}/${floorId}`, room,{headers});
      }
      saveSeat(blockId, floorId,roomId, seat,headers) {
        return axios.post(`${EASEAPP_URL}/saveSeat/${blockId}/${floorId}/${roomId}`, seat,{headers});
      }
       getFloorsByBlockId(blockId,headers){
       
        return axios.get(`${EASEAPP_URL}/getFloors/`+blockId,{headers});
       }
       getRoomsByBlockIdAndFloorId(blockId,floorId,headers){
          return axios.get(`${EASEAPP_URL}/getRooms/${blockId}/${floorId}`,{headers});
       }
       getSeats(blockId,floorId,roomId,headers){
       
        return axios.get(`${EASEAPP_URL}/listSeats/${blockId}/${floorId}/${roomId}`,{headers});
      }
      updateBlock(blockId,block,headers){
       
        return axios.put(`${EASEAPP_URL}/updateBlock/`+blockId,block,{headers});
       }
       getBlockById(blockId,headers){
       
        return axios.get(`${EASEAPP_URL}/getBlockById/`+blockId,{headers});
       }
       updateFloor(floorId,floor,headers){
       
        return axios.put(`${EASEAPP_URL}/updateFloor/`+floorId,floor,{headers});
       }
       getFloorById(floorId,headers){
       
        return axios.get(`${EASEAPP_URL}/getFloorById/`+floorId,{headers});
       }
       updateRoom(roomId,room,headers){
       
        return axios.put(`${EASEAPP_URL}/updateRoom/`+roomId,room,{headers});
       }
       getRoomById(roomId,headers){
         return axios.get(`${EASEAPP_URL}/getRoomById/`+roomId,{headers});
       }
       updateSeat(seatId,seat,headers){
       
        return axios.put(`${EASEAPP_URL}/updateSeat/`+seatId,seat,{headers});
       }
       getSeatById(seatId,headers){
         return axios.get(`${EASEAPP_URL}/getSeatById/`+seatId,{headers});
       }
       deleteBlock(blockId,headers){
       
        return axios.delete(`${EASEAPP_URL}/deleteBlock/`+blockId,{headers});
       }
       deleteFloor(floorId,headers){
       
        return axios.delete(`${EASEAPP_URL}/deleteFloor/`+floorId,{headers});
       }
       deleteRoom(roomId,headers){
       
        return axios.delete(`${EASEAPP_URL}/deleteRoom/`+roomId,{headers});
       }
       deleteSeat(seatId,headers){
       
        return axios.delete(`${EASEAPP_URL}/deleteSeat/`+seatId,{headers});
       }
       getAllSeats(headers){
        
        return axios.get(`${EASEAPP_URL}/getAllSeats`,{headers});
       }

}

export default new BlockService();