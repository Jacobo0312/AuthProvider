import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UsersTable from "./UsersTable";
import Home from "./Home";

function App() {
    return (
        <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/Users" Component={UsersTable}/>
                <Route path="/Home" element={<Home/>}/>
            </Routes>
        </Router>
        </div>
    );
  }
  

export default App;