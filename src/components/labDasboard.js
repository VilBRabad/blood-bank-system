import React, { useState } from 'react'
import "./LabDasboard.css";
import { MdBloodtype } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { CiDroplet } from "react-icons/ci";
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

  const [show, setShow] = useState(false);
  const goToRequestList = () => {
    setShow(!show);
  }

  const [btnValid, setBtnValid] = useState("");
  const handleCheckBox =(e)=>{
    let x = document.getElementById("conf").disabled;
    console.log(x);
    if(x){
      document.getElementById("conf").disabled = false;
      setBtnValid("green");
    }
    else{
      document.getElementById("conf").disabled = true;
      setBtnValid("");
      // console.log("false");
    }
  }

  const [isPop, setIsPop] = useState(false);
  const [blur, setBlur] = useState("");
  const [getDown, setGetDown] = useState("");
  const confirmClick = (e)=>{ 
    console.log(e);
    if(isPop){
      setBlur("blur");
      setIsPop(false);
      setGetDown("get-down");
    }
    else{
      setIsPop(true);
      setBlur("");
      setGetDown("");
    }
  }

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
        <div className={ `detail-card flex just-cent ali-cent ${show}` }>
          <div className="card rel">
            <div className="contain flex ali-cent rel">
              <div className="tot flex">
                <MdBloodtype />
                <span>123.5 L</span>
              </div>
              <div className="tot flex">
                <IoPeopleSharp />
                <span>14,638</span>
              </div>
              <div className="tot flex">
                <div className="x rel">
                  <h1 className="abs">A</h1>
                  <CiDroplet />
                </div>
                <span>13.5 L</span>
              </div>
              <div className="tot flex">
                <div className="x rel">
                  <h1 className="abs">B</h1>
                  <CiDroplet />
                </div>
                <span>21.7 L</span>
              </div>
              <div className="tot flex">
                <div className="x rel">
                  <h1 className="abs">AB</h1>
                  <CiDroplet />
                </div>
                <span>08.0 L</span>
              </div>
              <div className="tot flex">
                <div className="x rel">
                  <h1 className="abs">O</h1>
                  <CiDroplet />
                </div>
                <span>30.1 L</span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="abs" viewBox="0 0 1440 320"><path fill="#FF9898" fill-opacity="0.9" d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,128C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFBABA" fill-opacity="0.9" d="M0,160L60,165.3C120,171,240,181,360,160C480,139,600,85,720,96C840,107,960,181,1080,208C1200,235,1320,213,1380,202.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
          </div>
          <div className="hom flex ali-cent">
            <span>Welcome</span>
            <div className="flex">
              <button id="add-btn">Add Record</button>
              <button onClick={ goToRequestList }>See Requests</button>
            </div>
          </div>
        </div>
        <div className="add-record">
          <form action="#">

          </form>
        </div>
        <div className={ `request-list flex ali-cent ${!show}` }>
          <div className={`lister flex ali-cent ${blur}`}>
            <div className="back">
              <i class='bx bx-arrow-back' onClick={ goToRequestList } ></i>
            </div>
            <div className="head ali-cent flex">
              <h2 className="rel">Request List: </h2>
              <div className="search flex just-cent ali-cent">
                <input type="text" placeholder="Search" />
                <i class='bx bx-search'></i>
              </div>
            </div>
            <div className="line"></div>
            <div className="detail">
              <div className="card-det flex">
                <span>Name</span>
                <span>Appointment Data</span>
                <span>Mobile No.</span>
                <span>Blood Group</span>
                <span>Status</span>
              </div>
              <div className="cardp flex">
                <span>Rohit Laxman Fasale</span>
                <span>12/12/2023</span>
                <span>9359775994</span>
                <span>A-</span>
                <span><button className="conf" onClick={confirmClick}>Confirm</button></span>
              </div>
              <div className="cardp flex">
                <span>Vilas Balu Rabad</span>
                <span>20/12/2023</span>
                <span>7387410172</span>
                <span>O+</span>
                <span><button className="conf" onClick={confirmClick}>Confirm</button></span>
              </div>
            </div>
          </div>
          <div className={`confirmation abs flex just-cent ali-cent ${getDown}`}>
            <form action="#">
              <div className="liter flex">
                <label htmlFor="liter">Enter Blood Qauntity</label>
                <input type="number" name="liter" placeholder="In Liter" required />
              </div>
              <div className="checkbox flex just-cent ali-cent">
                <input type="checkBox" onChange={handleCheckBox} name="checkbox" />
                <label htmlFor="checkbox">Comfirm</label>
              </div>
              <div className="btns flex jus-cent ali-cent">
                <span className="cancel" onClick={confirmClick}>Cancel</span>
                <button type="submit" id="conf" className={`btn ${btnValid}`} disabled>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabDasboard
