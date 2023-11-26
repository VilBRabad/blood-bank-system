import React, {useState} from 'react'
import { NavLink, Outlet } from 'react-router-dom';

function Navbar(props) {
   let check = props.fun;

   // const [isLogin, setIsLogin] = useState(false);
   const [login, setLogin] = useState("Login");
   // const navigate = useNavigate();

   const goLogin = (e)=>{
      check.setShowLogin(!check.showLogin);
      // if(!isLogin){
      //    setIsLogin(!isLogin);
      //    setLogin("LogOut");
      //    navigate("/lab");
      // }
      // else{
      //    setIsLogin(!isLogin);
      //    setLogin("Login");
      //    navigate("/");
      // }
   }

   const goHome = ()=>{
      if(check.showLogin){
         check.setShowLogin(!check.showLogin);
      }
      // if(isLogin){
      //    setIsLogin(!isLogin);
      //    setLogin("Login");
      // }
      // redirect
   }

   return (
      <>
      <header className="Navbar flex ali-cent just-cent abs">
         <div className="list flex ali-cent just-cent">
            <ul className="flex">
               <li onClick={ goHome }><NavLink to="/">Home</NavLink></li>
               <li onClick={ goHome }><NavLink to="/About">About</NavLink></li>
               <li onClick={ goLogin }><NavLink to="#">{login}</NavLink></li>
               {/* {addNavList && <li>Vilas</li>} */}
            </ul>
         </div>
      </header>
      <Outlet/>
      </>
   )
}

export default Navbar
