
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import Login from './pages/login-page/LoginPage.jsx';
import Signup from './pages/Signup-page/SignupPage.jsx';
import HomePage from "./pages/Home/HomePage.jsx";
import ForgotPassword from "./pages/forgotpassword-page/ForgotPassword.jsx";
import How from "./pages/How/How.jsx";
import History from "./pages/History/History.jsx";
import StartPage from "./pages/Start/StartPage.jsx";


import "./pages/login-page/LoginPage.css";
import "./pages/Signup-page/SignupPage.css";
import "./pages/forgotpassword-page/ForgotPassword.css";

import "./Components/Footer/Footer.css";
import "./Components/Header/Header.css";
import "./pages/Home/HomePage.css";
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

                        {/* Start page: logged-in users only */}
                        <Route
                            path="/start"
                            element={
                                isAuthenticated ? (
                                    <StartPage />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
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
