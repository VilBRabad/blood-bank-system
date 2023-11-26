import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home.js";
// import labDasboard from "./components/labDasboard.js";
import Navbar from './components/Navbar.js';
import ErrorPage from './components/ErrorPage.js';
import LabDasboard from './components/labDasboard.js';

function App() {

  const [showLogin, setShowLogin] = useState(false);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Navbar fun={ { showLogin, setShowLogin } } /> }>
            <Route index element={ <Home prop={ { showLogin, setShowLogin } } /> } />
            <Route exact path="lab" element={ <LabDasboard /> } />
            <Route exact path=":path" element={ <ErrorPage /> } />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
