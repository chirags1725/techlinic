import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "./Loader";

const Card2 = () => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
  //   fetch(`/api/appointments?email=c@c.c`)
  //     .then((data) => data.json())
  //     .then((e) => {
  //       setAppointments(e.map(i=>{
  //         return {
  //           doctor:i.doctor,
  //           "Email": i.doctoremail,
  //           date:i.date,
  //           time:i.time,
  //           fees:i.fees
  //         }
  //       }));
  //     });

  let appointments1 = Array(50).fill(0).map((_, i) => {
    return {
      doctor: `Doctor ${i}`,
      Email: `doctor${i}@email.com`,
      date: `2023-03-0${i}`,
      time: `10:0${i} AM`,
      fees: i * 10
    }
  });
  
  setAppointments(appointments1);

  }, []);

  return (
    <div
      style={{
        background: "white",
        marginTop: "20px",
        padding: "20px 20px",
        borderRadius: "12px",
      }}
    >
      <h4>Appointments</h4>
      {appointments ? (appointments.length > 0 ?
        <TableContainer
        component={Paper}
        sx={{
          maxWidth: { xs: 300, sm: "80%", md: 1000 },
          marginTop: "28px",
          overflowX: "auto",
          left:"50%",
          position:"relative",
          transform:"translateX(-50%)",
        }}
        >
        <Table
          sx={{ minWidth: { xs: 300, sm: 400, md: 650 } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "rgba(34, 53, 239, 0.8)", color: "white" }}>
              {Object.keys(appointments[0]).map((key) => (
                <TableCell key={key} sx={{ color: "white", fontSize: "1em" }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                {Object.values(appointment).map((value) => (
                  <TableCell
                    style={{
                      background: index % 2 === 0 && "rgba(34, 53, 239, 0.05)",
                      whiteSpace: "nowrap", // Add this property
                    }}
                    key={value}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      :"Nothing to display"):<div style={{position:"relative",marginTop:"60px",marginBottom:"100px"}}><Loader style={{position:"relative"}}/></div>}
    </div>
  );
};

export default Card2;
