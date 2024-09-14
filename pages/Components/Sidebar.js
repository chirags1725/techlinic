import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { FaHistory, FaHome } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { PiNotebook, PiNotebookFill } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";


const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(null)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if(localStorage.getItem('user-role') === 'user'){

      setList({'Home':["user",<FaHome/>],'Appointment':["user/Appointment",<FaCalendar></FaCalendar>],"Past Prescriptions":["user/prescriptions",<FaHistory />]})
    }
    else{
      setList({'Home':["doctor",<FaHome/>],'Appointment':["doctor/Appointment",<FaCalendar/>],"Past prescriptions":["doctor/prescriptions",<FaHistory />]})


    }
  },[])

  const logout = () =>{
    localStorage.removeItem('user')
    localStorage.removeItem('user-role')
    router.push('/login')
  }

  return (
    <aside style={styles.sidebar(isOpen)}>
      <button onClick={handleToggle} style={styles.toggle}>
        {/* {isOpen ? 'Close' : 'Open'} */}
        <FiMenu style={{backgroundColor:"white"}}></FiMenu>
      </button>
      <ul style={isOpen ? styles.ulOpen : styles.ulClosed}>
      {list && Object.entries(list).map(([key,value],index)=>{
          return(
          <li key={index} style={{...styles.li ,...router.pathname === `/${value[0]}` ? styles.active : {}}}>
            {/* //dangerouslysetinnerhtml */}
          <Link href={`/${value[0]}`} style={{display:"flex",alignItems:"center",textDecoration:"none",fontWeight:"600",color:(router.pathname === (`/${value[0]}`)) ? "rgba(69,100,246)":"rgb(137,141,158)",transition:'color 0s',fontSize:"1em",width:"100%"}}>
            <div style={{fontSize:"1.2em"}}>{value[1]}</div>
             
          
          {<div style={{padding:"10px 14px",visibility:isOpen?"inherit":"hidden"}}>{key}</div>}
          </Link>
        </li>
          )
          
        })
      }
      </ul>
      <div onClick={logout} style={{cursor:'pointer',width:"100%",left:"0px",paddingLeft:"20px", display:"flex",alignItems:"end",position:"absolute",bottom:"40px",fontSize:"1.2em"}}>
      <FiLogOut/>
      {isOpen && <div style={{fontSize:".8em",marginLeft:"10px"}}>Logout</div>}
      </div>

    </aside>
  );
};


const styles = {
  sidebar: (isOpen) => ({
    width: isOpen ? '250px' : '80px',
    background: '#fff',
    padding: '20px',
    height: '100svh',
    position: 'sticky',
    top: '0px',
    left: '0px',
    transition: 'width .3s ease-in-out',
    // Add media queries for responsiveness
    '@media (maxWidth: 768px)': {
      width: isOpen ? '100%' : '60px',
      height: 'auto',
      padding: '10px',
      borderRight: 'none',
      position: 'relative',
    },
    '@media (maxWidth: 480px)': {
      width: isOpen ? '100%' : '60px',
      height: 'auto',
      padding: '5px',
      borderRight: 'none',
      position: 'relative',
    },
  }),
  toggle: {
    border: 'none',
    padding: '0px 0px',
    cursor: 'pointer',
    backgroundColor:"white",
    fontSize:'1.8em'
  },
  ulOpen: {
    marginTop:'40px',
    display: 'flex',
    flexDirection:"column",
    listStyle: 'none',
    gap:'12px'
  },
  ulClosed: {
    // display: 'none',
    marginTop:'40px',
    display: 'flex',
    flexDirection:"column",
    listStyle: 'none',
    gap:'12px',
    // width:"100%",
  },
  li:(isOpen)=>({
    textDecoration:"none",
    position:"relative",
    borderRadius:"4px",
    width:isOpen?"100%":"100%",

  }),

  active: {
    backgroundColor: 'rgba(249,250,255)',
    color:"rgba(69,100,246)"
  },

};

export default Sidebar;