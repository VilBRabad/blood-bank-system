import React, { useEffect, useState } from 'react'
import "./Home.css";
import { CiSearch } from "react-icons/ci";
import { BiSolidHelpCircle } from "react-icons/bi";
import Footer from './Footer';

function Home(props) {

   const [vis1, setVis1] = useState("");
   const [vis2, setVis2] = useState("visible");
   const [vis3, setVis3] = useState("");
   const [check, setCheck] = useState(false);
   const [show, setShow] = useState("hide");
   const [vis4, setVis4] = useState("switch");
   const [textChange, setTextChange] = useState("Already have account?");
   const [addblur, setAddBlur] = useState("");

   const selectChange = (e) => {
      const type = e.target.value;
      document.getElementById("lab-form").reset();
      document.getElementById("admin-form").reset();
      if (type === "doner") {
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
         setAddBlur("blure");
      }
      else{
         setShow("hide");
         setAddBlur("");
      }
   }, [x]);

   const loginSwitch = (e)=>{
      setCheck(!check);
      document.getElementById("lab-form").reset();
      document.getElementById("admin-form").reset();
      document.getElementById("login-form").reset();
      if(check){
         setVis3("switch");
         setVis4("");
         setTextChange("Not Resister!");
      }
      else{
         setVis3("");
         setVis4("switch");
         setTextChange("Already have account?");
      }
   }

   return (
      <div className="home rel">
         <div className={`content ${addblur} rel flex`}>
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
               <div className="options">
                  <label htmlFor="select">Select Type: </label>
                  <select name="select" id="select" onChange={selectChange}>
                     <option value="lab">Lab/Hospital</option>
                     <option value="doner">Doner</option>
                  </select>
               </div>
               <div className={`forms ${vis3}`}>
                  {/* For Lab/Hospitals Login Page */ }
                  <form action="#" className={ `lab ${vis1}`} id="lab-form">
                     <div className="names flex">
                        <div className="input lab-name">
                           <input type="text" name="name" required/>
                           <label htmlFor="name">Lab/Hospital Name:</label>
                        </div>
                        <div className="input">
                           <input type="text" name="id" required/>
                           <label htmlFor="id">Licensed ID:</label>
                        </div>
                     </div>
                     <div className="det flex">
                        <div className="input mb">
                           <input type="number" name="mobile" required/>
                           <label htmlFor="mobile">Mobile No.</label>
                        </div>
                     </div>
                     <div className="addr flex">
                        <div className="input add">
                           <input type="text"  name="address" required/>
                           <label htmlFor="address">Address </label>
                        </div>
                        <div className="input">
                           <input type="Number" name="pincode" required/>
                           <label htmlFor="pincode"> Pin Code : </label>
                        </div>
                     </div>
                     <button type="submit">Submit</button>
                  </form>
                  <form action="#" className={`admin ${vis2}`} id="admin-form">
                     <div className="names flex">
                        <div className="input">
                           <input type="text" name="fname" required/>
                           <label htmlFor="fname">First Name:</label>
                        </div>
                        <div className="input">
                           <input type="text" name="mname" required/>
                           <label htmlFor="mname">Middle Name:</label>
                        </div>
                        <div className="input">
                           <input type="text" name="lname" required/>
                           <label htmlFor="lname">Last Name:</label>
                        </div>
                     </div>
                     <div className="det flex">
                        <div className="input mb">
                           <input type="number" name="mobile" required/>
                           <label htmlFor="mobile">Mobile No.</label>
                        </div>
                        <div className="input dob flex">
                           <label htmlFor="dob">DOB : </label>
                           <input type="date" name="dob" id="dob" required/>
                        </div>
                     </div>
                     <div className="addr flex">
                        <div className="input add">
                           <input type="text" name="address" required/>
                           <label htmlFor="address">Address </label>
                        </div>
                        <div className="input">
                           <input type="Number" name="pincode" required/>
                           <label htmlFor="pincode"> Pin Code : </label>
                        </div>
                     </div>
                     <button type="submit">Submit</button>
                  </form>
               </div>
               <div className={`login-form flex ${vis4}`}>
                  <form action="#" className="flex" id="login-form">
                     <div className="input">
                        <input type="text" name="username" required/>
                        <label htmlFor="username">Username</label>
                     </div>
                     <div className="input">
                        <input type="text" name="password" required/>
                        <label htmlFor="password">Password</label>
                     </div>
                     <button type="submit">Login</button>
                  </form>
               </div>
               <a href="#" onClick={loginSwitch}>{textChange}</a>
            </div>
         </div>
         <BiSolidHelpCircle className="helpy" />
        <Footer />
      </div>
   )
}

export default Home
