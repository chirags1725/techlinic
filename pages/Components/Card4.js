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

const Card4 = ({head,noapp,Appointments}) => {
  const [appointments, setAppointments] = useState(null);
  const [user, setUser] = useState(null)


  const router = useRouter();


  useEffect(() => {
    if(Appointments !== null){
        setAppointments(Appointments.map(appointment => {
            const { email,doctor, ...rest } = appointment;
            return rest;
          }));
    }
        
  }, [Appointments]);

  useEffect(() => {
    
    setUser(JSON.parse(localStorage.getItem('user')))
    console.log(JSON.parse(localStorage.getItem('user')))

  
  }, [])
  
    


  const handlePrescribe = (name,date) => {
    // console.log(`Cancel appointment ${id}`);
    router.push(`../doctor/prescribe?doctor=${user.name}&name=${name}&date=${date}`)
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

      <h4>{head}</h4>
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
              <TableCell sx={{ color: "white", fontSize: "1em" }}>Prescribe</TableCell>
                    

            </TableRow>
          </TableHead>
          <TableBody>
            {appointments && appointments.map((appointment, index) => (
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
                    }}
                  >
                    <Button
                        variant="contained"
                        style={{padding:"8px 10px",fontSize:".75em",background:"#ef934960",color:"black",fontWeight:"600"}}
                        onClick={() => handlePrescribe(appointment.name,appointment.date)}
                      >
                        Prescribe
                      </Button>
                  </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop:"20px",textAlign:"center",color:"gray",fontSize:".9em"}}>{appointments.length} Appointments Scheduled</div>
      </div>
      :<div style={{marginTop:"36px",marginBottom:"20px",alignItems:"center",textAlign:"center",color:"gray"}}>{noapp}</div>):<div style={{position:"relative",marginTop:"60px",marginBottom:"100px"}}><Loader style={{position:"relative"}}/></div>}
    </div>
  );
};

export default Card4;