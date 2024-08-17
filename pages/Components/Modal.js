import React from 'react'
import styles from '../../styles/Modal.module.css'

const Modal = ({children,setAvailabilitymodalopen}) => {

  const handleClose = () => {
    setAvailabilitymodalopen(false);
  };
  return (
    <>
    <div className={styles.container} onClick={handleClose}>

    </div>
    <div className={styles.modal} style={{zIndex:"1000000000"}}>
        <span className={styles.close} onClick={handleClose} style={{position:"absolute",top:'10px',right:"40px",transform:"rotate(45deg)",fontSize:"2em",fontWeight:"100",userSelect:"none"}}>+</span>
      {children}
    </div>
    </>
  )
}

export default Modal
