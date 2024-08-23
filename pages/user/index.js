import React, { useEffect, useState } from 'react'
import styles from '../../styles/UserHome.module.css'
import Card1 from '../Components/Card1'
import Card2 from '../Components/Card2'

const index = () => {
  const [user, setUser] = useState(null)
  const [bmi, setbmi] = useState(null)
  const [remark, setremark] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))

    
  }, [])
  useEffect(()=>{

    if(user){
      setbmi((user.weight / (Math.pow(user.height / 100,2))).toFixed(2))
      // set remark underwiight or normal or overweight wrt BMi using ternary operator

    }

  },[user])
  useEffect(()=>{
    setremark(bmi < 18.5 ? "Underweight" : bmi < 24 ? "Normal" : "Overweight")
},[bmi])
  

  return (
    <div>
      <h2 className={styles.head}>Hi {user && user.name}</h2>
      {/* {user && (user.weight / (Math.pow(user.height / 100,2))).toFixed(2)} */}

<div className={styles.cards}>
      <Card1 heading="Height" value={user && user.height} unit="cms"></Card1>
      <Card1 heading="Weight" value={user && user.weight} unit="kgs"></Card1>
      <Card1 heading="BMI" unit={<span>kg/m<sup>2</sup></span>} value={bmi && bmi} remark = {remark && remark}></Card1>
      </div>

<Card2></Card2>

    </div>
  )
}

export default index
