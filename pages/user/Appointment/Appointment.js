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
      console.log(times)
      setmintime(times[0])
      setmaxtime(times[1])
      const timeSlots = [];
      for (let i = parseInt(times[0]); i < parseInt(times[1]); i++) {
        timeSlots.push(`${i}:00 - ${i + 1}:00`);
      }
      setTime([timeSlots]);
      setselecttime(timeSlots[0]); // Update selecttime with the first time slot
    }
  }, [times]);



  const handleDateChange = (date) => {
    console.log(date)
    setDate(date);
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
          date: date,
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
          router.push('/')
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

<button style={{background:"rgba(25, 126, 249, 1)",color:"white",padding:"8px",outline:"none",border:"none",borderRadius:"4px"}} onClick={(e)=>{
  getdata()
}} disabled={disable ? 'disabled' : ''}>Schedule Appointment</button>
</div>

      

    </div>
  );
};

export default CustomCalendar;