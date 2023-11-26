import React, { useState } from 'react';
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
   const [blur, setBlur] = useState("");

   const upDownHandle = () => {
      if (down == "") {
         setDown("down");
         setShow("show");
         setBlur("blur");
      }
      else {
         setDown("");
         setShow("");
         setBlur("");
      }
   }
   const [isAppointForm, setIsAppointForm] = useState(false);
   const [showAppoints, setShowAppoints] = useState(false);

   const handleAppoint = () => {
      setIsAppointForm(true);
      setShowAppoints(false);
   }

   const showAppHandle = ()=>{
      setShowAppoints(true);
   }

   const goDashboardHandle = ()=>{
      setIsAppointForm(false);
      setShowAppoints(false);
   }

   return (
      <div className="dashboard">
         <div className={ `info doner-info ${down}` }>
            <div className="cards flex">
               <i className={ `bx bxs-user-circle ${show}` }></i>
               <div className={ `flex ${show}` }>
                  <span>Name: { state.fname } { state.mname } { state.lname }</span>
                  <span>Mobile No.: { state.mobile }</span>
                  <span>Address: { state.Addrees }</span>
               </div>
            </div>
            <div className="up-down-btn flex just-cent">
               <i class={ `bx bx-chevron-down` } onClick={ upDownHandle }></i>
            </div>
         </div>
         <div className={`doner-contain ${blur}`}>
            <div className="Cards flex">
               <div className="Card num" onClick={goDashboardHandle}>
                  <span>6 Times</span>
               </div>
               <div className="Card" onClick={goDashboardHandle}>
                  <span>History</span>
               </div>
               <div className="Card book" onClick={ handleAppoint }>
                  <span >Book Apointment</span>
               </div>
               <div className="Card dt" onClick={showAppHandle}>
                  <span>Appointment: <span className="date">28/11/2023</span></span>
               </div>
            </div>
            {
               !showAppoints
               ?
               <>
               { !isAppointForm
                  ?
                  <div className="main flex just-cent ali-cent">
                     <span>Stay Healthy, Stay Happy</span>
                  </div>
                  :
                  <div className="forms f2">
                     <form action="#" >
                        <div className="flex">
                           <div className="input">
                              <label htmlFor="pincode">Pin Code</label>
                              <input type="number" required />
                           </div>
                           <div className="input in2">
                              <label htmlFor="select">Hospital Name</label>
                              <select name="select" id="select">
                                 <option value="0">-- Select --</option>
                                 <option value="1">Suvidha Hospital</option>
                                 <option value="2">Rio Hospital</option>
                                 <option value="2">Trio Labs</option>
                              </select>
                           </div>
                        </div>
                        <div className="btn flex just-cent ali-cent">
                           <button type="submit">Submit</button>
                        </div>
                     </form>
                  </div>
               }
               </>
               :
            <div className="appointment">
               <div className="header flex">
                  <span>ID</span>
                  <span>Booked Date</span>
                  <span>Reg. Date</span>
                  <span>Download Form</span>
                  <span>Action</span>
               </div>
               <div className="record flex">
                  <span>769879876</span>
                  <span>07/12/2023</span>
                  <span>30/11/2023</span>
                  <span>PDF</span>
                  <span className="cancle"><button>Cancel</button></span>
               </div>
            </div>
            }
         </div>
      </div>
   )
}

export default DonerDashbord
