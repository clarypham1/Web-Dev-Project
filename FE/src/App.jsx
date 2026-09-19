
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


import "./Components/login-page/LoginPage.css";
import "./Components/Signup-page/SignupPage.css";
import "./Components/forgotpassword-page/ForgotPassword.css";



 function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element = {<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
