import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/*' eleemnt={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
