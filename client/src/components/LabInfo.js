import React, { useEffect, useState } from 'react'
import { MdBloodtype } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { CiDroplet } from "react-icons/ci";
import AddRecord from './addRecord/AddRecord';

function LabInfo(props) {
   let state = props.state;

   const goToRequestList = () => {
      state.setShow(!state.show);
      // navigate("/lab/lab-request-list");
   }

   const [showAddRecord, setShowAddRecord] = useState(true);

   const goToAddRecords = ()=>{
      setShowAddRecord(!showAddRecord);
   }


   const [dasData, setDasData] = useState({
      totSum: "",
      totDon: "",
      totA: "",
      totB: "",
      totAB: "",
      totO: ""
   })
   useEffect(()=>{
      const statesHandle=async()=>{
         console.log("API");
         const res = await fetch("/statesHandle");
         console.log("after apis");
         const result = await res.json();
         // console.log(data);
         const data = result.data;
         console.log(data);
         
         if(data === 404){
            console.log("Unable to load")
         }
         else{
            setDasData({
               totSum: data[0],
               totDon: data[1],
               totA: data[2],
               totB: data[3],
               totAB: data[4],
               totO: data[5]
            })
         }
      }
      statesHandle();
      // console.log("vilas")
   },[]);

   return (
      <>
         {
            showAddRecord ?
               <div className={ `detail-card flex just-cent ali-cent` }>
                  <div className="card rel">
                     <div className="contain flex ali-cent rel">
                        <div className="tot flex">
                           <MdBloodtype />
                           <span>{dasData.totSum}.0 L</span>
                        </div>
                        <div className="tot flex">
                           <IoPeopleSharp />
                           <span>{dasData.totDon}</span>
                        </div>
                        <div className="tot flex">
                           <div className="x rel">
                              <h1 className="abs">A</h1>
                              <CiDroplet />
                           </div>
                           <span>{dasData.totA}.0 L</span>
                        </div>
                        <div className="tot flex">
                           <div className="x rel">
                              <h1 className="abs">B</h1>
                              <CiDroplet />
                           </div>
                           <span>{dasData.totB}.0 L</span>
                        </div>
                        <div className="tot flex">
                           <div className="x rel">
                              <h1 className="abs">AB</h1>
                              <CiDroplet />
                           </div>
                           <span>{dasData.totAB}.0 L</span>
                        </div>
                        <div className="tot flex">
                           <div className="x rel">
                              <h1 className="abs">O</h1>
                              <CiDroplet />
                           </div>
                           <span>{dasData.totO}.0 L</span>
                        </div>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="abs" viewBox="0 0 1440 320"><path fill="#FF9898" fill-opacity="0.9" d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,128C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFBABA" fill-opacity="0.9" d="M0,160L60,165.3C120,171,240,181,360,160C480,139,600,85,720,96C840,107,960,181,1080,208C1200,235,1320,213,1380,202.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                  </div>
                  <div className="hom flex ali-cent">
                     <span>Welcome</span>
                     <div className="flex">
                        <button id="add-btn" onClick={goToAddRecords}>Add Record</button>
                        <button onClick={ goToRequestList }>See Blood Requests</button>
                     </div>
                  </div>
               </div>
               :
               <AddRecord  state={{setShowAddRecord}}/>
         }
      </>
   )
}

export default LabInfo
