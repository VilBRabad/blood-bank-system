import './App.css';
import { useState } from 'react';
import Home from "./components/Home.js";
import Footer from './components/Footer.js';

function App() {

  const [showLogin, setShowLogin] = useState(false);

  const showIt = (e)=>{
    setShowLogin(!showLogin);
  }

  return (
    <div className="App">
      <header className="Navbar flex ali-cent just-cent abs">
        <div className="list flex ali-cent just-cent">
          <ul className="flex">
            <li>Home</li>
            <li>About</li>
            <li onClick={showIt}>Login</li>
          </ul>
        </div>
      </header>
      <Home prop={{showLogin, setShowLogin}}/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
