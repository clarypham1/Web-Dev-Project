
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import Login from './pages/login-page/LoginPage.jsx';
import Signup from './pages/Signup-page/SignupPage.jsx';
import HomePage from "./pages/Home/HomePage.jsx";
import ForgotPassword from "./pages/forgotpassword-page/ForgotPassword.jsx";
import StartPage from "./pages/Start-Page/StartPage.jsx";


import "./pages/login-page/LoginPage.css";
import "./pages/Signup-page/SignupPage.css";
import "./pages/forgotpassword-page/ForgotPassword.css";

import "./Components/Footer/Footer.css";
import "./Components/Header/Header.css";
import "./pages/Home/HomePage.css";



 function App() {

    const [isLoggedIn, setIsLoggedIn] = useState (false);
    // const [isLoggedIn, setIsLoggedIn] = useState (
    //     localStorage.getItem("isLoggedIn") === "true");
    return (
        <BrowserRouter>

            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn= {setIsLoggedIn}
            />

            <Routes>

                <Route 
                    path="/" 
                    element = {<HomePage />} 
                />

                <Route 
                    path="/login" 
                    element= {<Login setIsLoggedIn={setIsLoggedIn}/>}
                />

                <Route 
                    path="/start" 
                    element={<StartPage />} 
                />

                <Route 
                    path="/signup" 
                    element={<Signup />} 
                />

                <Route 
                    path="/forgot-password" 
                    element={<ForgotPassword />} 
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App
