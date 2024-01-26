import React, { useEffect, useState } from 'react'

function LabRequestList(props) {

  const state = props.state;
  // const state = "vilas"
  console.log(!state.show);

  const goToRequestList = () => {
    state.setShow(!state.show);
  }


  const [isPop, setIsPop] = useState(true);
  const [blur, setBlur] = useState("");
  const [getDown, setGetDown] = useState("");

  const [postData, setPostData] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const confirmClick = (item, index) => {
    // console.log(e);
    if (isPop) {
      setBlur("blur");
      setIsPop(false);
      setGetDown("get-down");
    }
    else {
      setIsPop(true);
      setBlur("");
      setGetDown("");
    }
    setPostData(item);
    setClickedButtons(prevState => [...prevState, index]);
  }

  const [loadData, setLoadData] = useState([]);
  useEffect(()=>{
    const LoadData=async()=>{
      const res = await fetch("/fetchLoadData");
      const data = await res.json();

      console.log(data.data);
      const x = data.data;
      console.log(x[0])
      setLoadData(x);
      // console.log(loadData);
    }
    LoadData();
  },[]);

  // useEffect(()=>{
    
  // },[loadData])


  // const [dis, setDis] = useState("dis");
  // const [acceptance, setAcceptance] = useState(false);

  const acceptRequest = async(e)=>{
    e.preventDefault();
    const query_id = postData[0];
    console.log(query_id)
    const res = await fetch("/acceptRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query_id
      })
   });

   const result = await res.json();
   console.log(result)
   if(result.code === 200){
    window.alert("Accepted.....")
    // setAcceptance(true);
    // document.getElementById("conf").disabled = true;
    // setDis("");
   }
   else{
    window.alert("Failed.....")
    // document.getElementById("conf").disabled = false;
    // setDis("dis");
   }
  }

  return (
    <div className={ `request-list flex ali-cent` }>
      <div className={ `lister flex ali-cent ${blur}` }>
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
            <span>Query id</span>
            <span>Name</span>
            <span>Mobile No.</span>
            <span>Message</span>
            <span>date</span>
            <span>Action</span>
          </div>
          <div className="cardp flex">
            {
              loadData.map((item, index)=>(
                <div className="take" key={index}>
                  <span>{ item[0] }</span>
                  <span>{ item[1] }</span>
                  <span>{ item[2] }</span>
                  <span>{ item[3] }</span>
                  <span>{ item[4] }</span>
                  {/* <span>{ item[5] }</span> */}
                  <span><button className={`conf ${clickedButtons.includes(index) ? 'clicked' : ''}`} id="conf" onClick={()=>confirmClick(item, index) }>Accept</button></span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className={ `confirmation abs flex just-cent ali-cent ${getDown}` }>
        <form >
          <div className="btns flex jus-cent ali-cent">
            <span className="cancel" onClick={ confirmClick }>Cancel</span>
            <button type="submit" className={ `btn` } onClick={acceptRequest}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LabRequestList
