import React from 'react';
import "./About.css";

function About() {
   return (
      <div className="about flex ali-cent" id="about">
         <h1>About</h1>
         <div className="about-contain flex ali-cent">
            <img src={ require("../../images/aboutImage.jpg") } alt="" />
            <div className="about-info flex just-cent ali-cent">
               <div className="circle"></div>
               <h2>Donate.<span>me</span></h2>
               <span className="dumy-para">Welcome to our Blood Bank Donation Center – a beacon of hope and compassion dedicated to saving lives through the invaluable gift of blood. At DONATE.ME, we firmly believe in the transformative power of community and the profound impact that each blood donation can have on the lives of those in need.</span>
               <div className="circle c2"></div>
            </div>
         </div>
      </div>
   )
}

export default About
