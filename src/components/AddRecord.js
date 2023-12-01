import React, { useEffect, useState } from 'react';
import "./AddRecord.css";

function AddRecord(props) {

   const [check, setCheck] = useState(true);
   const [set, setSet] = useState("translate");
   const [blur, setBlur] = useState("");

   const clickHandle = () => {
      if (!check) {
         setCheck(!check);
      }
   }
   const clickHandle2 = () => {
      if (check) {
         setCheck(!check);
      }
   }


   const [loadDataValue, setLoadDataValue] = useState({
      mobile: ""
   });
   const loadDataChangeHandle = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setLoadDataValue({ ...loadDataValue, [name]: value });
   }

   //********************************** Getted Data **************************/
   const [data, setData] = useState({
      name: "",
      age: "",
      mobile: "",
      blood_group: "",
      address: ""
   });

   const getData = async () => {
      const { mobile } = loadDataValue;
      const res = await fetch("/fetchData", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            mobile
         })
      });

      const dt = await res.json();
      if (dt.code === 200) {
         const result = dt.data;
         setData({
            name: result[0],
            age: result[1],
            mobile: result[2],
            blood_group: result[3],
            address: result[4]
         })
         console.log(result);
      }
      else if (dt.code === 404) {
         window.alert("Record Not Found....!");
      }
      else {
         window.alert("ERROR !!!");
      }
   }


   const [updateDet, setUpdateDet] = useState({
      quantity: ""
    });

    const updateHandleChanges = (e)=>{
      let name = e.target.name;
      let value = e.target.value;
      setUpdateDet({...updateDet, [name]:value})
    }

   const submitHandle = (e)=>{
      e.preventDefault();
      // if(data.name != ""){
         setSet("");
      // }
   }

   const finalSubmit = async(e)=>{
      e.preventDefault();
      const {mobile, blood_group} = data;
      
      const res = await fetch("/bloodDonation", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            mobile, blood_group
         })
      });

      const result = await res.json();

      if(result.code === 200){
         window.alert("Successfully Submitted, Thank you for your BLOOD!!");
         setSet("translate");
      }
      else{
         window.alert("Something Wrong Please Try Again");
      }

   }


   return (
      <div className="add-record">
         <div className="header flex just-cent ali-cent" >
            <div className="select-cards flex">
               <div className="option-card" onClick={ clickHandle }>
                  <h2>New Doner</h2>
               </div>
               <div className="option-card" onClick={ clickHandle2 }>
                  <h2>Having Doner ID</h2>
               </div>
            </div>
            <div className="back-btn">
               <div className="b flex just-cent ali-cent" onClick={ () => { props.state.setShowAddRecord(true) } }>
                  <i class='bx bx-arrow-back' ></i>
               </div>
            </div>
         </div>
         <div className="line"></div>
         <div className="forms">
            { check ?
               <div className="new">
                  <form action="#" className="flex just-cent ali-cent">
                     <i class='bx bxs-user-circle'></i>
                     <div className="p-info flex">
                        <div className="input">
                           <label htmlFor="mobile">Mobile No.:</label>
                           <input type="number" name="mobile" required />
                        </div>
                        <div className="input">
                           <label htmlFor="fname">First Name</label>
                           <input type="text" name="fname" required />
                        </div>
                        <div className="input">
                           <label htmlFor="mname">Middle Name</label>
                           <input type="text" name="mname" required />
                        </div>
                        <div className="input">
                           <label htmlFor="lname">Last Name</label>
                           <input type="text" name="lname" required />
                        </div>
                     </div>
                     <div className="cont p-info flex">
                        <div className="input">
                           <label htmlFor="gender">Gender:</label>
                           <select name="gender" id="">
                              <option value="">--Select Gender--</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                           </select>
                        </div>
                        <div className="input">
                           <label htmlFor="blood">Blood Group:</label>
                           <select name="blood" id="">
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                           </select>
                        </div>
                        <div className="input">
                           <label htmlFor="dob">DOB:</label>
                           <input type="date" name="dob" required />
                        </div>
                        <div className="input">
                           <label htmlFor="donate">Current Donated Blood:</label>
                           <input type="number" name="donate" placeholder="In Litter" required />
                        </div>
                     </div>
                     <div className="addr flex">
                        <div className="input">
                           <label htmlFor="address">Address:</label>
                           <input type="text" className="adres" name="address" required />
                        </div>
                        <div className="input">
                           <label htmlFor="pin">Pin Code:</label>
                           <input type="number" name="pin" required />
                        </div>
                     </div>
                     <div className="btn flex just-cent ali-cent">
                        <button type="submit">Submit</button>
                     </div>
                  </form>
               </div>
               :
               <div className="old">
                  <div className={`popup abs ${set}`}>
                     <h3>Submit</h3>
                     <form method="POST" className="flex just-cent ali-cent">
                        {/* <div className="input">
                           <label htmlFor="quantity">Quantity:</label>
                           <input type="text" placeholder="In Liter" name="quantity" value={updateDet.quantity} onChange={updateHandleChanges}/>
                        </div> */}
                        <div className="btn">
                           <button onClick={finalSubmit}>Submit</button>
                           <span className="cancel" onClick={()=>{setSet("translate"); setBlur("")}}>Cancel</span>
                        </div>
                     </form>
                  </div>
                  <form method="POST">
                     <div className="fetch flex just-cent ali-cent">
                        <div className="input">
                           <label htmlFor="mobile">Mobile No.</label>
                           <input type="number" name="mobile" value={ loadDataValue.mobile } onChange={ loadDataChangeHandle } required />
                        </div>
                        <span className="fetchbtn" onClick={ getData }>Fetch</span>
                     </div>
                     <div className="data">
                        <div className="detail">
                           <div className="card-det flex">
                              <span>Name</span>
                              <span>Age</span>
                              <span>Mobile No.</span>
                              <span>Blood Group</span>
                              <span>Adddress</span>
                           </div>
                           <div className="cardp flex">
                              <span>{ data.name }</span>
                              <span>{ data.age }</span>
                              <span>{ data.mobile }</span>
                              <span>{ data.blood_group }</span>
                              <span>{ data.address }</span>
                           </div>
                        </div>
                     </div>
                     <div className="btn flex just-cent ali-cent">
                        <button type="submit" onClick={submitHandle}>Submit</button>
                     </div>
                  </form>
               </div>
            }
         </div>
      </div>
   )
}

export default AddRecord
