import React from 'react'

const Card1 = (props) => {
  return (
    <div style={{display:"block",width:"160px",background:"white",height:"120px",boxShadow:"0px 0px 1px #00000012",padding:"20px",borderRadius:"20px",flex:"1",minWidth:"160px"}}>
      <div style={{fontWeight:"500",fontSize:".8em"}}>{props.heading}</div>
      <div style={{fontSize:"1.4em",fontWeight:"900",marginTop:"12px",marginBottom:"2px",color:props.color}}>{props.value} 
      <span style={{fontSize:".6em",fontWeight:"200"}}> {props.unit}</span>

      </div>
      <div style={{fontSize:".9em",fontWeight:"200",color:props.remark == "Normal"?"green":"red",marginTop:"2px"}}>{props.remark}</div>
    </div>
  )
}

export default Card1
