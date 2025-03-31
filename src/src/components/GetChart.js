import React, { useEffect, useState, useRef } from 'react';
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from 'chart.js';
import BlockService from '../service/BlockService';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import '../css/Graph.css';

const GetChart = () => {
  const [seats, setSeats] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

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
          setSeats(res.data);
        })
        .catch((error) => {
          console.error('Error retrieving seats:', error);
        });
    }
  }, []);

  useEffect(() => {
    const generateGraph = () => {
      if (seats.length === 0) {
        return; // Don't generate the graph if data is not available
      }

      const canvas = chartRef.current;
      const ctx = canvas.getContext('2d');

      Chart.register(LinearScale, BarController, CategoryScale, BarElement); // Register necessary modules

      const seatNames = seats.map((seat) => seat.seatName);
      const isAllocated = seats.map((seat) => seat.booked);

      // Destroy the existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Allocated Seats', 'Non-Allocated Seats'],
          datasets: [
            {
              label: 'Seat Allocation',
              data: [
                isAllocated.filter((val) => val).length, // Number of allocated seats
                isAllocated.filter((val) => !val).length, // Number of non-allocated seats
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)', // Allocated seats color
                'rgba(255, 99, 132, 0.6)', // Non-allocated seats color
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)', // Allocated seats border color
                'rgba(255, 99, 132, 1)', // Non-allocated seats border color
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category', // Use 'category' scale type for x-axis
            },
            y: {
              type: 'linear', // Use 'linear' scale type for y-axis
              beginAtZero: true,
              maxTicksLimit: Math.max(...isAllocated) + 1, // Set max ticks to the maximum value in isAllocated array
            },
          },
        },
      });
    };

    generateGraph();
  }, [seats]);

  const goBack = () => {
    window.location.href = 'http://localhost:3000/adminHome';
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:3000'; // Redirect to the login page or home page
  };

  const generatePDF = async () => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
      table: {
        margin: 10,
        display: 'table',
      },
      tableRow: {
        flexDirection: 'row',
        padding: 5,
      },
      tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      tableCell: {
        width: '20%',
        textAlign: 'center',
      },
    });
  
    const fileName = 'seat_generation_report.pdf';
  
    const pdfContent = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>SEAT GENERATION REPORT</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>SEAT NO</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>ROOM NO</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>FLOOR NO</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>BLOCK NO</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>isAllocated</Text>
                </View>
              </View>
              {seats.map((seat) => (
                <View key={seat.seatId} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>{seat.seatName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{seat.room.roomName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{seat.room.floor.floorName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{seat.room.floor.block.blockName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{seat.booked ? 'Yes' : 'No'}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  
    const pdfBlob = await pdf(pdfContent).toBlob();
    saveAs(pdfBlob, fileName);
  };

  return (
    <div>
      <div>
        <h1>SEAT GENERATION REPORT</h1>
        {seats.length > 0 ? (
          <>
            <canvas ref={chartRef}></canvas>
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
            <button onClick={generatePDF}>Download PDF</button>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <button onClick={goBack}>Back</button> <br/><br/>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default GetChart;
