import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setAuthenticated] = useState(false);
   // const navigate = useNavigate();
  useEffect(()=>{
    checkAuthentication();
  },[]);

  const checkAuthentication=async()=>{
    const res = await axios.get("/isAuthenticated");
    // if(!res) return;
    setAuthenticated(res.data.isAuth);
    console.log(res.data.isAuth);
  }

  const login = () => {
      // console.log("login fired");
      setAuthenticated(true);
  };

  const logout=async()=> {
      console.log("logout Fired");
      const response = await fetch("/logOut");
      const result = await response.json();
      if(result.code === 300){
        setAuthenticated(false);
      }
      else{
        window.alert("Something wrong to Log out");
      }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
