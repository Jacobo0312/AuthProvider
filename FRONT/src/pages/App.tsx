import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
    return (
        <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Routes>
        </Router>
        </div>
    );
  }
  

export default App;