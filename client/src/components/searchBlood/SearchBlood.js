import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./SearchBlood.css"


function SearchBlood() {

   const { pinCode } = useParams();

   const [resultData, setResultData] = useState([]);
   const [translate, setTranslate] = useState("");

   const[pincode, setPincode] = useState(pinCode);

   useEffect(() => {
      searchBloodByPin();
   }, []);

   const searchBloodByPin = async () => {
      const res = await fetch("/searchBloodByPin", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            pinCode
         })
      });

      const result = await res.json();
      if (result.code === 200) {
         // console.log(result.data);
         setResultData(result.data);
      }
      else{
         console.log("Not Found");
      }
   }

   const pincodeHandle=(e)=>{
      setPincode(e.target.value)
   }


   const cancelClick = ()=>{
      setTranslate("");
   }

   const [requestBlood, setRequestBlood] = useState({
      name:"",
      mobile: "",
      msg: ""
   })
   const [clickData, setClickData] = useState([]); 

   const handleOnChange = (e)=>{
      let name = e.target.name;
      let value= e.target.value;
      setRequestBlood({...requestBlood, [name]:value});
   }

   const fillForm =(item)=>{
      setTranslate("translation");
      setClickData(item);
      console.log(item);
   }

   const finalSubmit =async()=>{

      const {name, mobile, msg} = requestBlood;

      const res = await fetch("/requestForBlood", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            name, mobile, msg, clickData
         })
      });

      const result = await res.json();
      if(result.code === 200){
         window.alert("Request Submitted Successfully...");
      }
      else{
         window.alert("Something Wrong");
      }
   }

   return (
      <div className="searchBlood">
         <div className="container flex ">
            <div className={`popup abs ${translate}`}>
               <form action="#">
                  <div className="input">
                     <label htmlFor="name">Full Name:</label>
                     <input type="text" name="name" value={requestBlood.name}onChange={handleOnChange} required/>
                  </div>
                  <div className="input">
                     <label htmlFor="mobile">Mobile:</label>
                     <input type="text" name="mobile" value={requestBlood.mobile}onChange={handleOnChange} required/>
                  </div>
                  <div className="input">
                     <label htmlFor="msg">Message:</label>
                     <textarea name="msg" id="" cols="30" value={requestBlood.msg}onChange={handleOnChange} rows="10"></textarea>
                  </div>
                  <div className="btns">
                     <button onClick={finalSubmit}>Submit</button>
                     <span className="cancel" onClick={cancelClick}>Cancel</span>
                  </div>
               </form>
            </div>
            <div className="detail">
               <div className="input">
                  <input type="text" value={pincode} onChange={pincodeHandle} className="search" placeholder="Pin Code"/>
               </div>
               <div className="card-det flex">
                  <span>id</span>
                  <span>Name</span>
                  <span>Location</span>
                  <span>Available Unit</span>
                  <span>Blood Group</span>
                  <span>Status</span>
               </div>
               <div className="cardp flex">
                  { resultData.map((item, index) => (
                     <div className="take" key={ index }>
                        <span>{ item[4] }</span>
                        <span>{ item[0] }</span>
                        <span>{ item[1] }</span>
                        <span>{ item[2] }</span>
                        <span>{ item[3] }</span>
                        <span><button className="conf" onClick={()=>fillForm(item)}>Request</button></span>
                     </div>
                  )) }
               </div>
            </div>
         </div>
      </div>
   )
}

export default SearchBlood
