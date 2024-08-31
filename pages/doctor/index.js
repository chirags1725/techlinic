import React, { useEffect, useState } from 'react'
import styles from '../../styles/UserHome.module.css'
import Card1 from '../Components/Card1'
import Card4 from '../Components/Card4'

const index = () => {
  const [user, setUser] = useState(null)
  const [Appointments, setAppointments] = useState(null)

  useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem('user')))
      console.log(JSON.parse(localStorage.getItem('user')))

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

const todayDate = `${dd}-${mm}-${yyyy}`;
console.log(todayDate)
      

      fetch('/api/appointmentsDoctor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              email:JSON.parse(localStorage.getItem('user')).email,
              date:todayDate
            })
        }
      ).then(e=> e.json()).then(e=>{
        setAppointments(e)
        console.log(e)
      })
  },[])

  return (
    <div>
      <h2 className={styles.head}>Hi {user && user.name}</h2>
      
      <div className={styles.cards}>
      <Card1 heading="Today's Appointments" value={Appointments && Appointments.length}></Card1>
      <Card1 heading="Time" value={user && user.time && user.time.map(e=>{return `${e}:00`}).join(' - ')} unit="hrs"></Card1>
      </div>

      <Card4 Appointments={Appointments} head="Today's Appointments" noapp={"No appointments scheduled for today"}></Card4>


    </div>
  )
}

export default index
