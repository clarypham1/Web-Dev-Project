
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./Components/Footer.css";
import "./Components/Header.css";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";

import Login from './Components/login-page/LoginPage.jsx';
import Signup from './Components/Signup-page/SignupPage.jsx';

import "./Components/login-page/LoginPage.css";
import "./Components/Signup-page/SignupPage.css";


 function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
