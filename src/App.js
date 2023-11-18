import './App.css';
import Home from "./components/Home.js";
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <header className="Navbar flex ali-cent just-cent abs">
        <div className="list flex ali-cent just-cent">
          <ul className="flex">
            <li>Home</li>
            <li>About</li>
            <li>Login</li>
          </ul>
        </div>
      </header>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
