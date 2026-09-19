
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./Components/Footer.css";
import "./Components/Header.css";

import "./Components/HomePage.css";

import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";

import Login from './Components/login-page/LoginPage.jsx';
import Signup from './Components/Signup-page/SignupPage.jsx';
import HomePage from "./Components/HomePage.jsx";
import ForgotPassword from "./Components/forgotpassword-page/ForgotPassword.jsx";
import StartPage from "./Components/Start-Page/StartPage.jsx";


import "./Components/login-page/LoginPage.css";
import "./Components/Signup-page/SignupPage.css";
import "./Components/forgotpassword-page/ForgotPassword.css";



 function App() {

    const [isLoggedIn, setIsLoggedIn] = useState (localStorage.getItem("isLoggedIn") === "true");
    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path="/" element = {<HomePage />} />
                <Route path="/login" element= {<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path="/start" element={<StartPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
