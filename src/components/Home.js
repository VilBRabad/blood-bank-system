import React from 'react'
import "./Home.css";
import { CiSearch } from "react-icons/ci";
import { BiSolidHelpCircle } from "react-icons/bi";

function Home() {
  return (
    <div className="home rel">
      <div className="content rel flex">
         <div className="flex rel">
            <span>DONATE BLOOD</span>
            <p>Save Life</p>
            <form action="/">
               <div className="formDiv flex">
                  <input type="text" placeholder="Search Blood (e.g. O positive)" />
                  <CiSearch className="search-icon"/>
               </div>
            </form>
         </div>
      </div>
      <BiSolidHelpCircle className="helpy"/>
    </div>
  )
}

export default Home
