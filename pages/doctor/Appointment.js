import React, { useEffect, useState } from 'react'
import Card4 from '../Components/Card4'

const Appointment = () => {

  const [Appointments, setAppointments] = useState(null)
  const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const todayDate = parseInt(`${yyyy}${mm}${dd}`);

  useEffect(()=>{
      fetch('/api/appointmentsDoctor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              email:JSON.parse(localStorage.getItem('user')).email,
            })
        }
      ).then(e=> e.json()).then(e=>{
        setAppointments(e.filter(i=>parseInt(i.date.split('-').reverse().join('')) >= todayDate))
        console.log(e)
      })
  },[])




  return (
    <div>
      <Card4 Appointments={Appointments} head="All Appointments" noapp={"No appointments scheduled"}></Card4>
      
    </div>
  )
}

export default Appointment
