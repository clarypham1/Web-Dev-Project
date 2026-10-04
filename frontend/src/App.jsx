
import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import Login from './pages/login-page/LoginPage.jsx';
import Signup from './pages/Signup-page/SignupPage.jsx';
import HomePage from "./pages/Home/HomePage.jsx";
import ForgotPassword from "./pages/forgotpassword-page/ForgotPassword.jsx";
import How from "./pages/How/How.jsx";
import History from "./pages/History/History.jsx";
import OurStoryPage from "./pages/OurStory/OurStoryPage.jsx";

const Startpage = lazy(() => import("./pages/Startpage.jsx"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage.jsx"));


import "./pages/login-page/LoginPage.css";
import "./pages/Signup-page/SignupPage.css";
import "./pages/forgotpassword-page/ForgotPassword.css";

import "./Components/Footer/Footer.css";
import "./Components/Header/Header.css";
import "./pages/Home/HomePage.css";
import "./App.css";



function AppRoutes({ isAuthenticated, setIsAuthenticated }) {
    const { pathname } = useLocation();
    const isLegacyFrontendPage = pathname === "/start" || pathname === "/wardrobe";

    useEffect(() => {
        document.body.classList.toggle("legacy-frontend-page", isLegacyFrontendPage);

        return () => document.body.classList.remove("legacy-frontend-page");
    }, [isLegacyFrontendPage]);

    return (
        <>
            <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
            <div className="app-content">
                    <Routes>

                        <Route
                            path="/"
                            element={<HomePage />}
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
                            path="/our-Story"
                            element={<OurStoryPage />}
                        />

                        <Route
                            path="/wardrobe"
                            element={
                                <Suspense fallback={<div className="route-loading">Loading...</div>}>
                                    <Startpage key="wardrobe" initialPage="wardrobe" />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/contact"
                            element={
                                <Suspense fallback={<div className="route-loading">Loading...</div>}>
                                    <ContactUsPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/start"
                            element={
                                <Suspense fallback={<div className="route-loading">Loading...</div>}>
                                    <Startpage key="start" />
                                </Suspense>
                            }
                        />

                        <Route
                            path="*"
                            element={<Navigate to="/"/>}
                        />

                    </Routes>
            </div>

            {!isLegacyFrontendPage && <Footer />}
        </>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user && user.token ? true : false;
    });

    return (
        <div className="App">
            <BrowserRouter>
                <AppRoutes
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                />
            </BrowserRouter>
        </div>
    );
}

export default App
