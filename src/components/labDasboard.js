import React, { useState } from 'react'
import "./LabDasboard.css";
import LabInfo from './LabInfo';
import LabRequestList from './LabRequestList';
// import { GiWaterDrop } from "react-icons/gi";

function LabDasboard() {

  const [isDown, setIsDown] = useState(false);
  const [down, setDown] = useState("down");
  const [hide, setHide] = useState("");
  const [slide, setSlide] = useState("");
  const [addBlur, setAddBlur] = useState("");

  let hospital_det = {
    id: "ES23800XD",
    name: "Suvidha Hospital And Laboratry Tests, Pune",
    address: "Pansare nagar Yewalewadi, Tal. Haveli, Pune- 411048",
    contact: "+91 73874101XX",
  }
  let admin_det = {
    id: "22110883",
    name: "Vilas Balu Rabad",
    contact: "+91 93597759XX",
  }

  

  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    setIsDown(!isDown);
    document.getElementById("add-btn").disabled = true;
    if (isDown) {
      setDown("up");
      setHide("vis");
      setSlide("slide");
      setAddBlur("blur");
    }
    else {
      setDown("down");
      setHide("");
      setSlide("");
      setAddBlur("");
    }
  };
  

  return (
    <div className="dashboard rel">
      <div className={ `info rel flex ${slide}` }>
        <div className="cards flex ali-cent">
          <div className={ `hospital-tab flex ${hide}` }>
            <span>ID: { hospital_det.id }</span>
            <span>Name: { hospital_det.name }</span>
            <span>Address: { hospital_det.address }</span>
            <span>Contact Information: { hospital_det.contact }</span>

          </div>
          <div className={ `logo flex just-cent ${hide}` }>
            <img src={ require("../images/Logo.png") } alt="" />
          </div>
          <div className={ `admin-tab flex ${hide}` }>
            <span>ID: { admin_det.id }</span>
            <span>Name: { admin_det.name }</span>
            <span>Contact Information: { admin_det.contact }</span>
          </div>
        </div>
        <div className="up-down-btn flex just-cent">
          <i class={ `bx bx-chevron-${down}` } onClick={ handleClick }></i>
        </div>
      </div>
      <div className={ `contaner-das ${addBlur}` }>
        {!show ? <LabInfo state={{show, setShow}}/>
        :<LabRequestList state={{show, setShow}}/>}
      </div>
    </div>
  )
}

export default LabDasboard
