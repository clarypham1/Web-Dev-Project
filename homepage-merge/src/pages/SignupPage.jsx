
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSignup from "../hooks/useSignup";



const SignUp = ({setIsAuthenticated}) => {

    const [username, setUserName] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [confirmpassword, setConfirmPassword] = useState ("");
    const [passwordError, setPasswordError] = useState ("");

    const navigate = useNavigate();

    const { signup, isLoading, error } = useSignup ("/api/users/signup");

    const handleSubmit = async (event) => {
        event.preventDefault (); 

        if (password !== confirmpassword) {
            setPasswordError("Your confirm password do not match");
            return;
        }
        setPasswordError("");

        const user = await signup ({ name: username, email, password });

        if (user) {
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <>
        <div className = "Sign-up">
            <h3> Welcome your Closis! </h3>

            {/* sign up form */}
            <form onSubmit = {handleSubmit}>
                
                {/* username input */}
                <input
                    name = "username"
                    placeholder = "your username"
                    type = "text"
                    value = {username}
                    onChange = {(event) => setUserName (event.target.value)} // update the username when tye user type
                    required
                />
                <br/>

                {/* email input */}
                <input
                    name = "email"
                    placeholder = "✉️ email"
                    type = "email"
                    value = {email}
                    onChange = {(event) => setEmail (event.target.value)} // update the email when the user types
                    required
                />
                <br />

                {/* password input */}
                <input
                    name = "password"
                    placeholder = "🗝️ password"
                    type = "password"
                    value = {password}
                    onChange = {(event) => setPassword (event.target.value)} // update the password when the user types
                    minLength="8" // require 8 character minimum
                    required

                />
                <br />

                {/* confirm password input */}
                <input
                    name = "ConfirmPassword"
                    placeholder = "🗝️ confirm password"
                    type = "password"
                    value = {confirmpassword}
                    onChange = {(event) => setConfirmPassword (event.target.value)} //update the confirm password when the user type
                    minLength="8" // require 8 character minimum
                    required

                />
                <br />

                

                {/* submit the sign up form */}
                <button type="submit" disabled = {isLoading}> Sign Up </button>

                {/* display error message only when there is error */}
                {error && (
                    <p className="error-message">
                        {error}

                    </p>
                )}

                {passwordError && (
                    <p className = "error-message">
                        {passwordError}

                    </p>
                )}

                <p>
                    {/* link to the log in page */}
                    Already have an account? {" "}
                    <Link to="/login">Log in </Link>
                </p>

            </form>

        </div>
    </>
    );


}

export default SignUp;