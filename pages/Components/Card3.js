import Link from 'next/link'
import React from 'react'

const Card3 = (props) => {
  const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const name = props.name;
  const email = props.email;
  const availability = props.days;
  const time = props.time;
  const fees = props.fees;

  let dayS = '';
  let timeS = '';

  if (availability) {
    dayS = availability.join(',');
  }

  if (time) {
    timeS = time.join(',');
  }

  return (
    <div style={{ background: "white", width: "100%", padding: "24px", display: "flex", justifyContent: "space-between", maxWidth: "1000px", marginBottom: "10px", borderRadius: "10px" }}>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontWeight: '600', fontSize: "1.4em" }}>Dr. {name.charAt(0).toUpperCase() + name.slice(1)}</div>
        <div style={{ fontWeight: '200', fontSize: ".8em" }}>{email}</div>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: '200', textAlign: "center", fontSize: ".8em", display: "flex", gap: "4px", color: "gray", justifyContent: "center" }}>
            {availability && availability.map((e) => {
              return <div>{daysOfWeek[e]}</div>
            })}
          </div>

          <div style={{ color: "gray", fontSize: ".8em" }}>
            {time && time.map((e) => { return `${e}:00` }).join('-')}
          </div>
        </div>
        <div>
          <div>&#8377; {fees}</div>
          <div style={{ padding: "10px", marginTop: "8px" }}>
            <Link style={{ background: "rgba(25, 126, 249, 1)", padding: "10px", color: "white", textDecoration: "none", borderRadius: "4px" }} href={`/user/Appointment/Appointment?name=${name}&time=${timeS}&days=${dayS}&fees=${fees}&email=${email}`}>Schedule &#8594;</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card3
