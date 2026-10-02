
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import HomePage from "./pages/HomePage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import How from "./pages/How.jsx";
import History from "./pages/History.jsx";


import "./pages/LoginPage.css";
import "./pages/SignupPage.css";
import "./pages/ForgotPassword.css";

import "./Components/Footer.css";
import "./Components/Header.css";
import "./pages/HomePage.css";
import "./App.css";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user && user.token ? true : false;
    });

    return (
        <div className="App">

            <BrowserRouter>

                <Header
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                />
                <div className="app-content">
                    <Routes>

                        <Route
                            path="/"
                            element={<HomePage isAuthenticated={isAuthenticated} />}
                        />

                        <Route
                            path="/login"
                            element={
                            isAuthenticated? (
                            <Navigate to="/" />)
                            : ( <Login setIsAuthenticated={setIsAuthenticated} />

                            )
                        }
                        />

                        <Route
                            path="/signup"
                            element={
                            isAuthenticated? (
                            <Navigate to="/" />)
                            : ( <Signup setIsAuthenticated={setIsAuthenticated} />

                            )
                        }
                        />

                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />

                        <Route
                            path="/how"
                            element={<How />}
                        />

                        <Route
                            path="/history"
                            element={
                                isAuthenticated ? (
                                    <History />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />

                        <Route
                            path="*"
                            element={<Navigate to="/"/>}
                        />

                    </Routes>
                </div>

                <Footer />

            </BrowserRouter>
        </div>
    );
}

export default App