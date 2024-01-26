"use client"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/home/Home.js";
// import labDasboard from "./components/labDasboard.js";
import Navbar from './components/Navbar.js';
import ErrorPage from './components/ErrorPage.js';
import LabDasboard from './components/labDashboard/labDasboard.js';
import DonerDashbord from './components/donerDashboard/DonerDashbord.js';
import { useAuth } from './Context/AuthContext.js';
import SearchBlood from './components/searchBlood/SearchBlood.js';

function App() {

  const { isAuthenticated} = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={ <Navbar fun={ { showLogin, setShowLogin } } /> }>
              {
                isAuthenticated?<>
                <Route exact path="lab" element={ <LabDasboard /> }/>
                <Route exact path="doner" element={ <DonerDashbord/> }/>
                </>
                :
                <>
                <Route index element={ <Home prop={ { showLogin, setShowLogin } } /> } />
                </>
              }
              <Route path="/Search-Blood/:pinCode" element={<SearchBlood/>}/>
              <Route exact path=":path" element={ <ErrorPage /> } />
            </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;