import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Card5 from '../Components/Card5'

const prescribe = () => {
    const router = useRouter()
    const name = router.query.name
    const doctor = router.query.doctor
    const date = router.query.date


    useEffect(() => {
      if (name) {
        console.log([name,doctor,date])
      }
    }, [name,doctor,date]) 
    
  return (
    <div>
        {/* <h1>Prescribe</h1> */}
        <h1>{name}</h1>
        <span style={{color:"gray",fontSize:'.8em',marginTop:"6px"}}>{date}</span>
        <h4 style={{color:"#00000080",fontSize:".8em"}}>Dr. {doctor && (doctor.charAt(0).toUpperCase() + doctor.slice(1))}</h4>
      
<Card5 name={name} doctor={doctor} date={date}></Card5>
    </div>
  )
}

export default prescribe
