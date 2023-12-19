import logo from './ISS_emblem.png';
import './App.css';
import Tracker from "./components/Tracker";


function App() {
  return (

    <div className="App-data">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-title">Welcome to the International Space Station Tracker</div>
      <Tracker />
    </div>

  );
}

export default App;
