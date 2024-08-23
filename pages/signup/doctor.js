import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import React from "react";
import Modal from "../Components/Modal";

import Box from "@mui/joy/Box";

import Slider from "@mui/joy/Slider";
import Loader from "../Components/Loader";
import { useRouter } from "next/router";

export default function Signup() {
  const [availabilitymodalopen, setAvailabilitymodalopen] = useState(false);
  const [sliderValue, setSliderValue] = useState(350);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [startTime, setStartTime] = useState("09");
  const [endTime, setEndTime] = useState("10");

  const submit = (data) => {
    //post using fetch
    fetch("/api/signup/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setTimeout(() => {
            setError(null);
          }, 4000);
          setLoader(false);
        } else {
          console.log(data);
          setLoader(false);
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("user-role", "doctor");
          router.push("/");
          // window.location.href = '/'
        }
      });
    setAvailabilitymodalopen(false);
  };

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const [selectedDays, setSelectedDays] = useState([]);

  const handleClick = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        // Remove day from array if already selected
        return prevSelectedDays.filter((d) => d !== day);
      } else {
        // Add day to array if not selected
        return [...prevSelectedDays, day];
      }
    });
  };

  React.useEffect(() => {
    setFormData({
      ...formData,
      availability: selectedDays,
    });
  }, [selectedDays]);

  React.useEffect(() => {
    setFormData({
      ...formData,
      fees: sliderValue,
    });
  }, [sliderValue]);

  React.useEffect(() => {
    setFormData({
      ...formData,
      time: [startTime,endTime],
    });
  }, [startTime,endTime]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    availability: [],
    fees: sliderValue,
    time:[startTime,endTime]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setOpen(true)
    setAvailabilitymodalopen(true);
    // Handle form submission
  };

  const registerdoctor = () => {
    submit(formData);
    setLoader(true);
  };
  return (
    <div className={styles.container}>
      {loader && <Loader></Loader>}
      <div className={styles.logo}>Techlinic</div>

      <div className={styles.imageSection}>
        <div style={{ width: "100%", height: "100%" }}>
          <Image
            src="/Female-Doctor-Vector-Illustration.jpg"
            alt="Signup"
            fill
            style={{
              objectFit: "contain",
            }}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div
            style={{
              marginBottom: "40px",
              fontWeight: "800",
              fontSize: "1.6em",
            }}
          >
            Register as a doctor
          </div>

          {error && (
            <div
              style={{
                marginBottom: "40px",
                marginTop: "-20px",
                background: "red",
                color: "white",
                padding: "4px 10px",
                textTransform: "capitalize",
              }}
            >
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className={styles.input}
              required
            />
            <label className={styles.label}>Name</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className={styles.input}
              required
            />
            <label className={styles.label}>Email</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              minLength={"1"}
              className={styles.input}
              required
            />
            <label className={styles.label}>Password</label>
          </div>
          <div
            style={{
              fontSize: ".88em",
              display: "flex",
              justifyContent: "space-between",
              margin: " -12px 10px 16px",
            }}
          >
            Already have an account? <Link href="/login/doctor">Sign in</Link>
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>

          {availabilitymodalopen && (
            <Modal setAvailabilitymodalopen={setAvailabilitymodalopen}>
              <h2>Select availability</h2>
              <div className={styles.days}>
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`${styles.day} ${
                      selectedDays.includes(day) ? styles.selected : ""
                    }`}
                    onClick={() => {
                      handleClick(index);
                    }}
                    style={{
                      backgroundColor: selectedDays.includes(index)
                        ? "#2170f350"
                        : "transparent",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>
                Select your Charges
              </h2>

              <div
                style={{
                  display: "flex",
                  background: "transparent",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box sx={{ width: 300 }}>
                  <Slider
                    aria-label="Fare"
                    defaultValue={300}
                    valueLabelDisplay="off"
                    onChange={(event, value) => {
                      setSliderValue(value);
                    }}
                    style={{ background: "transparent" }}
                    step={50}
                    min={300}
                    max={1000}
                    marks
                  />
                </Box>
                <div style={{ resize: "none", padding: "8px 10px" }}>
                  {sliderValue}
                </div>
              </div>

              <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>
                Select your time
              </h2>
              {/* input for time starttime and endtime and endtime should always be greater than starttime */}
              <div
                style={{
                  display: "flex",
                  background: "transparent",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option value={i.toString().padStart(2, "0")}>{`${i
                      .toString()
                      .padStart(2, "0")}:00`}</option>
                  ))}
                </select>

                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {Array.from({ length: 24 - parseInt(startTime) }, (_, i) => (
                    <option
                      value={(parseInt(startTime) + i + 1)
                        .toString()
                        .padStart(2, "0")}
                    >{`${(parseInt(startTime) + i + 1)
                      .toString()
                      .padStart(2, "0")}:00`}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={registerdoctor}
                className={styles.submitButton}
                style={{ marginTop: "20px" }}
              >
                Register
              </button>
            </Modal>
          )}
        </form>
      </div>
    </div>
  );
}
Signup.useLayout = false;
