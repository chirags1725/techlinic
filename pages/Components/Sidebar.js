import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(null)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if(localStorage.getItem('user-role') === 'user'){

      setList({'Home':"user",'Appointment':"user/Appointment","Cs,okwkoe":"vla"})
    }
    else{
      setList({'Home':"user",'Appointment':"user/Appointment","doctor":"vla"})

    }
  },[])

  return (
    <aside style={styles.sidebar(isOpen)}>
      <button onClick={handleToggle} style={styles.toggle}>
        {/* {isOpen ? 'Close' : 'Open'} */}
        <FiMenu style={{backgroundColor:"white"}}></FiMenu>
      </button>
      <ul style={isOpen ? styles.ulOpen : styles.ulClosed}>
      {list && Object.entries(list).map(([key,value],index)=>{
          return(
          <li key={index} style={{...styles.li ,...router.pathname === `/${value}` ? styles.active : {}}}>
          <Link href={`/${value}`} style={{textDecoration:"none",fontWeight:"600",color:router.pathname !== `/${value}` ? "rgb(137,141,158)" : "rgba(69,100,246)",transition:'color 0s',fontSize:"1em",width:"100%"}}>
          
          <div style={{padding:"10px 14px"}}>{key}</div></Link>
        </li>
          )
        })
      }
      </ul>
    </aside>
  );
};


const styles = {
  sidebar: (isOpen) => ({
    width: isOpen ? '250px' : '80px',
    background: '#fff',
    padding: '20px',
    height: '100vh',
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
    gap:'8px'
  },
  ulClosed: {
    display: 'none',
  },
  li:{
    textDecoration:"none",
    position:"relative",
    borderRadius:"4px"

  },

  active: {
    backgroundColor: 'rgba(249,250,255)',
    color:"rgba(69,100,246)"
  },

};

export default Sidebar;