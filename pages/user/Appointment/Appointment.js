import Loader from '@/pages/Components/Loader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const CustomCalendar = () => {
  const router = useRouter()
  const [query, setQuery] = useState({});
  const [days,setDays] = useState([])
  const [times,setTimes] = useState(null)
  const [mintime, setmintime] = useState(null)
  const [maxTime, setmaxtime] = useState(null)
  const [date, setDate] = useState(null);
  const selectableWeekdays = days;
  const [time, setTime] = useState(null)
  const [doctorname, setDoctorname] = useState(null)
  const [username, setUsername] = useState(null)
  const [selecttime, setselecttime] = useState('')
  const [user, setUser] = useState(null)
  const [fees, setfees] = useState(null)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [disable, setdisable] = useState(null)
  const [message, setMessage] = useState(null)
  const [slots, setSlots] = useState({})



  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query);
    }
  }, [router.isReady]);

  useEffect(()=>{
    if(query.days){
    setDays(query.days)
    setDoctorname(query.name)
    setfees(query.fees)
    setEmail(query.email)
    }
    // get item from localhost by checking localhost exist
  },[query])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))

    
  }, [])

  useEffect(()=>{
    if(query.time){
      setTimes(query.time.split(','))

      // setmintime()
    }
  },[query])
  


  
  useEffect(() => {
    if (times) {
      setmintime(times[0])
      setmaxtime(times[1])
      const timeSlots = [];
      for (let i = parseInt(times[0]); i < parseInt(times[1]); i++) {
        timeSlots.push(`${i}:00 - ${i + 1}:00`);
      }
      setTime([timeSlots]);
      setselecttime(timeSlots[0]);
    }
  }, [times]);



  const handleDateChange = (date) => {
    console.log(date)
    setDate(date);
    setSlots(null)
    // Post request with fetch
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');

    const response = fetch('/api/availableAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: formattedDate,
          time: time,
          email: email
        })
      }).then(e=>e.json()).then(e=>{setSlots(e);console.log(e)})
  };

  const getDayOfWeek = (date) => {
    const dayOfWeek = date.getDay();
    // Adjust the day of the week to make Monday 0 and Sunday 6
    return (dayOfWeek + 6) % 7;
  };

  const isValidDate = (date) => {
    const dayOfWeek = getDayOfWeek(date);
    const isFutureDate = date.getTime() >= new Date().getTime();
    return selectableWeekdays.includes(dayOfWeek) && isFutureDate;
  };

  const tileDisabled = ({ date }) => {
    return !isValidDate(date);

  };


  const getdata = ()=>{
    if(user.name && doctorname && fees && date && selecttime){
       // Make post request with fetch and body
       setdisable(true)
       const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');

       fetch('/api/appointmentsUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          name:user.name,
          doctor:doctorname,
          email:email,
          fees:fees,
          date: formattedDate,
          time:selecttime
    })
  })
  .then(e=>{
    setdisable(false)
      return e.json()
    
    }).then(e=>{
      if(e.message){
        setMessage(e.message)
        setTimeout(() => {
          setMessage('')
          // router.push('/')
        }, 2000);
        }
        else{
          setError(e.error)
          setTimeout(() => {
            setError('')
          }, 2000);
        }
        

  })
  setError('')
    }
    else{
      setError('Please fill all the details')
      setTimeout(() => {
        setError('')
      }, 2000);
    }
  }

  return (
    <div>
          {error && <div style={{marginBottom:"40px",marginTop:"-20px",background:"red",color:'white',padding:"4px 10px", textTransform:"capitalize"}}>{error}</div>}
          {message && <div style={{marginBottom:"40px",marginTop:"-20px",background:"lightgreen",color:'black',padding:"4px 10px", textTransform:"capitalize"}}>{message}</div>}
    <div style={{display:"flex",gap:"100px",justifyContent:"space-between",flexWrap:"wrap"}}>

      <div style={{flex:1}}>

      <h2 style={{marginBottom:"40px"}}>
        Select Date and Time
      </h2>

    {doctorname && <h6 style={{fontWeight:'800',fontSize:"1.2em"}}>Dr. {doctorname.charAt(0).toUpperCase() + doctorname.slice(1)}</h6>}
    <br></br>

    <Calendar
      onChange={handleDateChange}
      value={date}
      tileDisabled={tileDisabled}
    />

{/* <div>
        <label>Start Time:</label>
        <TimePicker
          onChange={setStartTime}
          value={startTime}
          minTime={minTime}
          maxTime={endTime}
        />
      </div> */}
      {/* <div>
        <label>Start Time:</label>
        <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
          {timeSlots.map((timeSlot, index) => (
            <option key={index} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      </div> */}

{time && <select style={{padding:"4px",fontSize:".9em",marginTop:"10px"}} value={selecttime} onChange={(e) => {
  const selectedTimeSlots = Array.from(e.target.selectedOptions, (option) => option.value);
  setselecttime(selectedTimeSlots);
}}>
  {time[0] && time[0].map((timeSlot, index) => (
    <option key={index} value={timeSlot}>
      {timeSlot}
    </option>
  ))}
</select>}

<br></br>
<br></br>
<div style={{alignItems:"center",display:"flex",gap:"10px"}}>
&#8377; {fees}

<button style={{background:disable?"gray":"rgba(25, 126, 249, 1)",color:"white",padding:"8px",outline:"none",border:"none",borderRadius:"4px"}} onClick={(e)=>{
  getdata()
}} disabled={disable ? 'disabled' : ''}>Schedule Appointment</button>
</div>


</div>
<div style={{marginRight:"100px",height:"60vh",alignContent:"center",flex:"1",minWidth:"200px"}}>
  <div style={{border:"1px solid black",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"center"}}>
    <div>
<h2>Available slots</h2>
  <br></br>
  {slots ? Object.entries(slots).map(([key, value]) => (
    <div key={key} style={{marginBottom:"4px"}}>
    <span style={{fontSize:"1.2em",fontWeight:"500"}}>{key}:</span> <span style={{fontSize:"1.2em",fontWeight:"600",color:value > 0 ? "green":"red"}}>{value}</span>
    </div>
  )):<div style={{ position: "relative", marginTop: "60px", marginBottom: "100px" }}>
  <Loader style={{ position: "relative" }} />
</div>}
</div>
</div>
      </div>

    </div>
    </div>
  );
};

export default CustomCalendar;