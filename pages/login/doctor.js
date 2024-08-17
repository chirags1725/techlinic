import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import React from "react";
import Loader from "../Components/Loader";
import { useRouter } from "next/router";

export default function Login() {
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(formData)
    setLoader(true)
    setError(false)

  };


  const submit = (data) => {
    //post using fetch
    fetch("/api/login/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    // if the response tatus is 401 set seterror to message else clg response
    .then(res=>res.json())
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
          localStorage.setItem('user-role','doctor')
          router.push('/')
          // window.location.href = '/'
          }
          })

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
            Login as a doctor
          </div>
          {error && <div style={{marginBottom:"40px",marginTop:"-20px",background:"red",color:'white',padding:"4px 10px", textTransform:"capitalize"}}>{error}</div>}
          
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
            Don't have an account? <Link href="/signup/doctor">Sign Up</Link>
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          
        </form>
      </div>
    </div>
  );
}
Login.useLayout = false;
