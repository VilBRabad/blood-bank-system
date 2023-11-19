import React, { useEffect, useState } from 'react'
import "./Home.css";
import { CiSearch } from "react-icons/ci";
import { BiSolidHelpCircle } from "react-icons/bi";

function Home(props) {

   const [vis1, setVis1] = useState("visible");
   const [vis2, setVis2] = useState("");
   const [vis3, setVis3] = useState("");
   const [check, setCheck] = useState(false);
   const [show, setShow] = useState("hide");
   const [vis4, setVis4] = useState("switch");

   const selectChange = (e) => {
      const type = e.target.value;
      if (type === "lab") {
         setVis2("");
         setVis1("visible");
      }
      else {
         setVis1("");
         setVis2("visible");
      }
   }
   let x= props.prop.showLogin;
   useEffect(()=>{
      if(x){
         setShow("show");
      }
      else{
         setShow("hide");
      }
   }, [x]);

   const loginSwitch = (e)=>{
      setCheck(!check);
      if(check){
         setVis3("switch");
         setVis4("");
      }
      else{
         setVis3("");
         setVis4("switch");
      }
   }

   return (
      <div className="home rel">
         <div className="content rel flex">
            <div className="flex rel">
               <span>DONATE BLOOD</span>
               <p>Save Life</p>
               <form action="/">
                  <div className="formDiv flex">
                     <input type="text" placeholder="Search Blood (e.g. O positive)" />
                     <CiSearch className="search-icon" />
                  </div>
               </form>
            </div>
         </div>
         <div className={`form flex just-cent ${show}`}>
            <div className="login flex">
               <div>
                  <label htmlFor="option">Choose Type : </label>
                  <select name="option" id="type-list" onChange={ selectChange }>
                     <option value="lab">Lab/Hospital</option>
                     <option value="individual">Individual</option>
                  </select>
               </div>
               <div className={`forms ${vis3}`}>
                  {/* Login form for Individual Person */ }
                  <form action="#" className={ `individual ${vis1}` }>
                     <div className="names flex">
                        <div className="input">
                           <label htmlFor="fname">First Name</label>
                           <input type="text" name="fname" />
                        </div>
                        <div className="input">
                           <label htmlFor="mname">Middle Name</label>
                           <input type="text" name="mname" />
                        </div>
                        <div className="input">
                           <label htmlFor="lname">Last Name</label>
                           <input type="text" name="lname" />
                        </div>
                     </div>
                     <div className="det flex">
                        <div className="input mb">
                           <label htmlFor="mobile">Mobile No.</label>
                           <input type="number" name="mobile" />
                        </div>
                        <div className="input dob">
                           <label htmlFor="dob">DOB : </label>
                           <input type="date" name="dob" id="dob" />
                        </div>
                     </div>
                     <div className="per-det">
                        <select name="gen" id="gen">
                           <option value="gender">Select Gender</option>
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                        </select>
                        <select name="type" id="type">
                           <option value="bloodtype">Blood Type</option>
                           <option value="apositive">A+</option>
                           <option value="anegative">A-</option>
                           <option value="bpositive">B+</option>
                           <option value="bnegative">B-</option>
                           <option value="abpositive">AB+</option>
                           <option value="abnegative">AB-</option>
                           <option value="opositive">O+</option>
                           <option value="onegative">O-</option>
                        </select>
                     </div>
                     <div className="addr flex">
                        <div className="input add">
                           <label htmlFor="address">Address </label>
                           <input type="text" name="address" />
                        </div>
                        <div className="input">
                           <label htmlFor="pincode"> Pin Code : </label>
                           <input type="Number" name="pincode" />
                        </div>
                     </div>
                     <button type="submit">Submit</button>
                  </form>
                  {/* For Lab/Hospitals Login Page */ }
                  <form action="#" className={ `lab ${vis2}` }>
                     <div className="names flex">
                        <div className="input lab">
                           <label htmlFor="name">Lab/Hospital Name</label>
                           <input type="text" name="name" />
                        </div>
                        <div className="input">
                           <label htmlFor="id">Lab/Hospital ID</label>
                           <input type="text" name="id" />
                        </div>
                     </div>
                     <div className="det flex">
                        <div className="input mb">
                           <label htmlFor="mobile">Mobile No.</label>
                           <input type="number" name="mobile" />
                        </div>
                        {/* <div className="input dob">
                           <label htmlFor="dob">DOB : </label>
                           <input type="date" name="dob" id="dob" />
                        </div> */}
                     </div>
                     <div className="addr flex">
                        <div className="input add">
                           <label htmlFor="address">Address </label>
                           <input type="text" name="address" />
                        </div>
                        <div className="input">
                           <label htmlFor="pincode"> Pin Code : </label>
                           <input type="Number" name="pincode" />
                        </div>
                     </div>
                     <button type="submit">Submit</button>
                  </form>
               </div>
               <div className={`login-form flex ${vis4}`}>
                  <form action="#">
                     <div className="input">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" />
                     </div>
                     <div className="input">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" />
                     </div>
                     <button type="submit">Login</button>
                  </form>
               </div>
               <a href="#" onClick={loginSwitch}>Already have a Account?</a>
            </div>
         </div>
         <BiSolidHelpCircle className="helpy" />
      </div>
   )
}

export default Home
