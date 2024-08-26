import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "./Loader";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const Card2 = () => {
  const [appointments, setAppointments] = useState(null);

  const router = useRouter();


  useEffect(() => {

    if (router.isReady) {
      const userName =(JSON.parse(localStorage.getItem('user')).name)

    if (userName) {
    fetch(`/api/appointmentsUser?name=${userName}`)
      .then((data) => data.json())
      .then((e) => {
        setAppointments(e.map(i=>{
          return {
            _id:i._id,
            doctor:i.doctor,
            email: i.email,
            date:i.date,
            time:i.time,
            fees:i.fees,

          }
        }));
      });
    }
  }
  // let appointments1 = Array(50).fill(0).map((_, i) => {
  //   return {
  //     _id: `appointment-${i}`,
  //     doctor: `Doctor ${i}`,
  //     Email: `doctor${i}@email.com`,
  //     date: `2023-03-0${i}`,
  //     time: `10:0${i} AM`,
  //     fees: i * 10
  //   }
  // });
  
  // setAppointments(appointments1);
  // setAppointments([]);

  }, [router.isReady]);

  const handleCancel = (id) => {
    // console.log(`Cancel appointment ${id}`);
    fetch(`/api/appointmentsUser?id=${id}`, {
      method: "DELETE"
      }).then(e=>e.json())
      .then(e=>{
        if(e.message){
          alert(e.message)
          setAppointments(appointments.filter((appointment) => appointment._id !== id));
        }
        if(e.error){
          alert(e.error)
        }
      })
  };

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
      <div>
        <TableContainer
        component={Paper}
        sx={{
          maxWidth: { xs: 300, sm:400, md: 900 },
          marginTop: "28px",
          overflowX: "auto",
          left:"50%",
          position:"relative",
          transform:"translateX(-50%)",
        }}
        >
        <Table
          sx={{ minWidth: { xs: 300, sm: 300, md: 650 } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "rgba(34, 53, 239, 0.8)", color: "white" }}>
              {Object.keys(appointments[0]).filter(key => key !== '_id').map((key) => (
                <TableCell key={key} sx={{ color: "white", fontSize: "1em" }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
              ))}
                                <TableCell sx={{ color: "white", fontSize: "1em" }}>Cancel</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                {Object.entries(appointment).filter(([key]) => key !== '_id').map(([key, value]) => (
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
                <TableCell
                style={{
                  background: index % 2 === 0 && "rgba(34, 53, 239, 0.05)",
                  whiteSpace: "nowrap", // Add this property
                }}>
                      <Button
                        variant="contained"
                        color="error"
                        style={{padding:"8px 10px",fontSize:".75em"}}
                        onClick={() => handleCancel(appointment._id)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop:"20px",textAlign:"center",color:"gray",fontSize:".9em"}}>{appointments.length} Appointments Scheduled</div>
      </div>
      :<div style={{marginTop:"36px",marginBottom:"20px",alignItems:"center",textAlign:"center",color:"gray"}}>No Appointments Scheduled</div>):<div style={{position:"relative",marginTop:"60px",marginBottom:"100px"}}><Loader style={{position:"relative"}}/></div>}
    </div>
  );
};

export default Card2;