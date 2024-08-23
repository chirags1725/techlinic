import Card3 from "@/pages/Components/Card3";
import Loader from "@/pages/Components/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const index = () => {
  const [doctors, setDoctors] = useState(null)

  useEffect(() => {
    fetch("/api/fetchdoctors")
      .then((e) => e.json())
      .then((e) => {
        console.log(e)
        setDoctors(e);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const values = {
  //   time:time
  // }

  return (
    <div>
      <h2 style={{marginBottom:"40px"}}>
        Schedule an Appointment
      </h2>

      {doctors ? (
  <center>
    {doctors.map((doctor,index) => (
      <Card3 name={doctor.name} email={doctor.email} days={doctor.availability} time={doctor.time} fees={doctor.fees}>
      </Card3>
    ))}
  </center>
) : (
  <div style={{ position: "relative", marginTop: "60px", marginBottom: "100px" }}>
    <Loader style={{ position: "relative" }} />
  </div>
)}

</div>
  );
};

export default index;
