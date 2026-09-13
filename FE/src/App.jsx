import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/login-page/LoginPage.jsx';
import Signup from './Components/Signup-page/SignupPage.jsx';

import "./Components/login-page/LoginPage.css";
import "./Components/Signup-page/SignupPage.css";
import "./Components/login-page/Header.css";
import "./Components/login-page/Footer.css";

 function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
