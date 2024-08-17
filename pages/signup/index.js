import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import Loader from "../Components/Loader";
import Modal from "../Components/Modal";
import Slider from "@mui/joy/Slider";
import Box from "@mui/joy/Box";
import React from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [availabilitymodalopen, setAvailabilitymodalopen] = useState(false);

  const [loader, setLoader] = useState(false);
  const [height, setHeight] = useState(70);
  const [weight, setWeight] = useState(40);
  const [error, setError] = useState(null)
  const router = useRouter()

  const submit = (data) => {
    //post using fetch
    fetch("/api/signup/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then(data => {
      if(data.error){
        setError(data.error)
        setTimeout(() => {
          setError(null)
        }, 4000);
        setLoader(false)
        }else{
          console.log(data)
          setLoader(false)
          localStorage.setItem('user', JSON.stringify(data))
          localStorage.setItem('user-role','user')
          router.push('/')
          // window.location.href = '/'
          }
          }
    
    );
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAvailabilitymodalopen(true);

    // Handle form submission
  };
  const registerUser = () => {
    submit(formData);
    setLoader(true);
    setAvailabilitymodalopen(false)
  };

  React.useEffect(() => {
    setFormData({
      ...formData,
      height: height,
    });
  }, [height]);

  React.useEffect(() => {
    setFormData({
      ...formData,
      weight: weight,
    });
  }, [weight]);

  return (
    <div className={styles.container}>
      {loader && <Loader></Loader>}

      <div className={styles.logo}>Techlinic</div>

      <div className={styles.imageSection}>
        <div style={{ width: "100%", height: "100%" }}>
          <Image
            src="/medical-clinic-web-illustration-vector.jpg"
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
            Create an account
          </div>

          {error && <div style={{marginBottom:"40px",marginTop:"-20px",background:"red",color:'white',padding:"4px 10px", textTransform:"capitalize"}}>{error}</div>}

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
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>

          {availabilitymodalopen && (
            <Modal setAvailabilitymodalopen={setAvailabilitymodalopen}>
              <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>Enter your Height(in cm)</h2>

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
                    defaultValue={30}
                    min={70}
                    max={230}
                    valueLabelDisplay="auto"
                    onChange={(event, value) => {
                      setHeight(value);
                    }}
                  ></Slider>
                </Box>
                <div style={{ resize: "none", padding: "8px 10px" }}>
                  {height}
                </div>
              </div>

              <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>
                Enter your Weight in kg
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
                    defaultValue={30}
                    min={40}
                    max={120}
                    valueLabelDisplay="auto"
                    onChange={(event, value) => {
                      setWeight(value);
                    }}
                  ></Slider>
                </Box>

                <div style={{ resize: "none", padding: "8px 10px" }}>
                  {weight}
                </div>
              </div>

              <button
                onClick={registerUser}
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
