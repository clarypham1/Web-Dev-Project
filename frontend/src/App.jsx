
import {useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import Login from './pages/login-page/LoginPage.jsx';
import Signup from './pages/Signup-page/SignupPage.jsx';
import HomePage from "./pages/Home/HomePage.jsx";
import ForgotPassword from "./pages/forgotpassword-page/ForgotPassword.jsx";
import How from "./pages/How/How.jsx";
import History from "./pages/History/History.jsx";


import "./pages/login-page/LoginPage.css";
import "./pages/Signup-page/SignupPage.css";
import "./pages/forgotpassword-page/ForgotPassword.css";

import "./Components/Footer/Footer.css";
import "./Components/Header/Header.css";
import "./pages/Home/HomePage.css";
import "./App.css";



 function App() {
    const [isLoggedIn, setIsLoggedIn] = useState (
        localStorage.getItem("isLoggedIn") === "true");
    return (
        <BrowserRouter>

            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn= {setIsLoggedIn}
            />
            <div className = "app-content">
                <Routes>

                    <Route 
                        path="/" 
                        element = {<HomePage isLoggedIn={isLoggedIn} />} 
                    />

                    <Route 
                        path="/login" 
                        element= {<Login setIsLoggedIn={setIsLoggedIn}/>}
                    />

                    <Route 
                        path="/signup" 
                        element={<Signup setIsLoggedIn={setIsLoggedIn} />} 
                    />

                    <Route 
                        path="/forgot-password" 
                        element={<ForgotPassword />} 
                    />

                    <Route
                        path="/how"
                        element = {<How />}
                    />

                    <Route
                        path="/history"
                        element = {isLoggedIn ? <History />: <Navigate to="/login"/>}
                    />

                </Routes>
            </div>

            <Footer />

        </BrowserRouter>
    );
}

export default App
