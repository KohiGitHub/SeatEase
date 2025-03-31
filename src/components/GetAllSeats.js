import React, { useEffect, useState } from 'react';
import BlockService from '../service/BlockService';
import '../css/List.css';

const GetAllSeats = () => {
  const [seats, setSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [allocatedSeats, setAllocatedSeats] = useState(0);
  const [nonAllocatedSeats, setNonAllocatedSeats] = useState(0);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null) {
      window.location.href = 'http://localhost:3000';
    } else {
      const headers = {
        'Authorization': 'Bearer ' + jwtToken,
      };
      BlockService.getAllSeats(headers)
        .then((res) => {
          const sortedSeats = res.data.sort((a, b) => {
            // Sort by allocated seats first, then non-allocated seats
            if (a.booked && !b.booked) {
              return -1;
            } else if (!a.booked && b.booked) {
              return 1;
            } else {
              return 0;
            }
          });
          setSeats(sortedSeats);

          // Calculate the total number of seats, allocated seats, and non-allocated seats
          const total = sortedSeats.length;
          const allocated = sortedSeats.filter((seat) => seat.booked).length;
          const nonAllocated = total - allocated;
          setTotalSeats(total);
          setAllocatedSeats(allocated);
          setNonAllocatedSeats(nonAllocated);
        })
        .catch((error) => {
          console.error('Error retrieving seats:', error);
        });
    }
  }, []);

  const goBack = () => {
    window.location.href = 'http://localhost:3000/adminHome';
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
  };

  return (
    <div>
      <div>
        <h1>SEAT GENERATION REPORT</h1>
        <div className="stats">
          <p>Total Seats: {totalSeats}</p>
          <p>Allocated Seats: {allocatedSeats}</p>
          <p>Non-Allocated Seats: {nonAllocatedSeats}</p>
        </div>
        <table className="table" border="1">
          <thead>
            <tr>
              <th>SEAT NO</th>
              <th>ROOM NO</th>
              <th>FLOOR NO</th>
              <th>BLOCK NO</th>
              <th>isAllocated</th>
            </tr>
          </thead>
          <tbody>
            {seats.map((seat) => (
              <tr key={seat.seatId}>
                <td>{seat.seatName}</td>
                <td>{seat.room.roomName}</td>
                <td>{seat.room.floor.floorName}</td>
                <td>{seat.room.floor.block.blockName}</td>
                <td>{seat.booked ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={goBack}>Back</button> <br/><br/>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default GetAllSeats;
