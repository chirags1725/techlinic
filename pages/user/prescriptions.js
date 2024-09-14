import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaCaretDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const prescriptions = () => {
    const [prescription, setPrescription] = useState(null)
    const [name, setName] = useState(null)
    const router = useRouter()
    useEffect(()=>{
        setName(JSON.parse(localStorage.getItem("user")).name)
    },[router.isReady])

    useEffect(() => {
        if(name){
        fetch(`/api/prescription?name=${name}`).then(e=>e.json()).then(e=>setPrescription(e))
        }
    }, [name])

    const [expanded, setExpanded] = React.useState(0);

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    
  return (
    
    <div>
        <h2>
            Prescriptions
        </h2>
      {prescription ? <div style={{marginTop:"40px",justifyContent:"center",textAlign:"center",alignContent:"center",alignItems:"center",display:"flex",flexDirection:"column",width:"100%"}}> 
        {prescription.length>0 ? prescription.map((e,index)=>{
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];        const [day,month,year] = e.date.split('-')
        return <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index} style={{maxWidth:"1000px",width:"100%",backgroundColor:index%2 === 0 ? "rgba(224, 234, 255, 0.8)" : "rgba(224, 234, 255, 0.2)",outline:"none",border:"none"}}>
        <AccordionSummary
          expandIcon={<FaCaretDown></FaCaretDown>}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{fontSize:".85em"}}
        >
          {`${day} ${months[parseInt(month)-1]} ${year}`}
        </AccordionSummary>
        <AccordionDetails style={{alignItems:"start",textAlign:"start",marginTop:"-10px"}}>
            <div style={{fontSize:".8em",color:"gray",marginBottom:"2px"}}>Doctor: {e.doctor}</div>
            <div style={{fontSize:".8em",color:"gray"}}>Diagnosis: {e.diagnosis}</div>

            {e.prescription && <center><table key={index} style={{ maxWidth:"800px",marginTop:"20px", width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
      <tbody>
        <tr>
          <th style={{ backgroundColor: "rgba(254, 240, 255, 0.8)", padding: "10px", border: "1px solid #ddd" }}>Medicine</th>
          <th style={{ backgroundColor: "rgba(254, 240, 255, 0.8)", padding: "10px", border: "1px solid #ddd" }}>Times per day</th>
          <th style={{ backgroundColor: "rgba(254, 240, 255, 0.8)", padding: "10px", border: "1px solid #ddd" }}>Days</th>
        </tr>
        {e.prescription.map((prescription, index) => {
  return (
    
        <tr>
          <td style={{ padding: "10px",background:"white" , border: "1px solid #ddd" }}>{prescription.medicine}</td>
          <td style={{ padding: "10px",background:"white" , border: "1px solid #ddd" }}>{prescription.timesperday}</td>
          <td style={{ padding: "10px",background:"white" , border: "1px solid #ddd" }}>{prescription.days}</td>
        </tr>
  )}

)} </tbody>
</table></center>}
            

        </AccordionDetails>
      </Accordion>
      }):"No Past Prescriptions"}</div> : <div style={{position:"relative",marginTop:"80px"}}><Loader style={{position:"relative"}}></Loader></div>}
    </div>
  )
}

export default prescriptions
