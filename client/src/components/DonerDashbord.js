import React, {useState} from 'react';
import "./DonerDashbord.css";

function DonerDashbord() {

   let state = {
      fname: "Vilas",
      mname: "Balu",
      lname: "Rabad",
      mobile: "7387410172",
      Addrees: "At. Bahare (Dongripada), Post. Dhundalwadi, Tal. Dahanu, Dist. Palghar"
   }

   const [down, setDown] = useState("");
   const [show, setShow] = useState("");
   const upDownHandle =()=>{
      if(down == ""){
         setDown("down");
         setShow("show");
      }
      else{
         setDown("");
         setShow("");
      }
   }

  return (
    <div className="dashboard">
      <div className={`info doner-info ${down}`}>
         <div className="cards flex">
            <i className={`bx bxs-user-circle ${show}`}></i>
            <div className={`flex ${show}`}>
               <span>Name: {state.fname} {state.mname} {state.lname}</span>
               <span>Mobile No.: {state.mobile}</span>
               <span>Address: {state.Addrees}</span>
            </div>
         </div>
         <div className="up-down-btn flex just-cent">
          <i class={ `bx bx-chevron-down` } onClick={upDownHandle}></i>
        </div>
      </div>
    </div>
  )
}

export default DonerDashbord
