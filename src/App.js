import './App.css';
import "antd/dist/antd.css";
import logo from './logo.svg';
import MainPage from './mainpage';
import LoggedIn from './loggedIn';
import { Routes, Route, Link } from "react-router-dom";
import React, {Fragment} from 'react';
import StaffInfo from './staffInfo';
import AddStaff from './addStaff';
import RemoveStaff from './removeStaff';
import RemoveClient from './removeClient';
import AddClient from './addClient';
import RetrieveClient from './retrieveClient';
import AddReport from './addReport';
import DeleteReports from './deleteReports';
import AllClients from './allClients';

function App() {
  return (
    <div className="App">
      <header className="App-header">

{/*         
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>  */}
        {/* <AddReport /> */}
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/loggedIn" element={<LoggedIn />}/>
            <Route path="/staffInfo" element={<StaffInfo />}/>
            <Route path="/addStaff" element={<AddStaff />}/>
            <Route path="/removeStaff" element={<RemoveStaff />}/>
            <Route path="/allClients" element={<AllClients />}/>
            <Route path="/addClient" element={<AddClient />}/>
            <Route path="/removeClient" element={<RemoveClient />}/>
            <Route path="/retrieveClient" element={<RetrieveClient />}/>
            <Route path="/addReport" element={<AddReport />}/>
            <Route path="/deleteReport" element={<DeleteReports />}/>
          </Routes>
      </header>
    </div>
  );
}

export default App;
