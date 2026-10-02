

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";


const Login = ({ setIsAuthenticated }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error} = useLogin("/api/users/login");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = await login({ email, password });

        if (user) {
            setIsAuthenticated(true);
            navigate ("/");
        }

    };

        return (
            <>
                <div className="log-in">
                    
                    <h3> Welcome your Closis! </h3>

                    {/* log in form   */}
                    <form onSubmit={handleSubmit}>

                        {/* email input  */}
                        <input
                            name="email"
                            placeholder="✉️ email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} // update the email state when the user types
                            required // the user must enter email 
                        />
                        <br />

                        {/* password input  */}
                        <input
                            name="password"
                            placeholder="🗝️ password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} //update the password state when the user types
                            required // the user must enter the password

                        />
                        <br />

                        {/* display the error message only when the error state is not empty */}
                        {error && (
                            <p className="error-message">
                                {error}
                            </p>
                        )}

                        {/* submit log in form */}
                        <button type="submit" disabled={isLoading}> log in </button>

                        {/* link forget password  */}
                        <p>
                            <Link to="/forgot-password">
                                Forgot your password?
                            </Link>
                        </p>

                        {/* link to the sign up page */}
                        <p>
                            Don't have an account? {" "}
                            <Link to="/signup">Sign up</Link>
                        </p>

                    </form>

                </div>
            </>
        );


    }

    export default Login;