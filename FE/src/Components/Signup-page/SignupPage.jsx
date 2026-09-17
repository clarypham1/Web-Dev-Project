

import {useState} from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


function SignUp () {

    // store the username typed by user
    const [username, setUserName] = useState ("");
    // store the email typed by user
    const [email, setEmail] = useState ("");
    // store the password typed by user
    const [password, setPassword] = useState ("");
    // store the confirm password typed by user
    const [confirmpassword, setConfirmPassword] = useState ("");
    // store the error message
    // It is empty when there is no error
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault (); // Prevent the page from refreshing when the form is submitted

        setError(""); // clear the previous error

        // check the password and confirm password are the same or not
        if (password !==confirmpassword) {
            setError("!Password do not match");
            return;
        }

        // store the signup information
        const SignUpInformation = {
            UserName: username,
            Email: email,
            Password: password,
            ConfirmPassword: confirmpassword

        };

        console.log (SignUpInformation); // show the sign up information in the console
    };

    return (
        <>
        {/* header component */}
        <Header />
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
                />
                <br/>

                {/* email input */}
                <input
                    name = "email"
                    placeholder = "✉️ email"
                    type = "text"
                    value = {email}
                    onChange = {(event) => setEmail (event.target.value)} // update the email when the user types
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

                {/* display error message only when there is error */}
                {error && (
                    <p className="error-message">
                        {error}

                    </p>
                )}

                {/* submit the sign up form */}
                <button type= "submit"> Sign Up </button>

                <p>
                    {/* link to the log in page */}
                    Already have an account? {" "}
                    <Link to="/login">Log in </Link>
                </p>

            </form>

        </div>
        <Footer/>
    </>
    );


}

export default SignUp;
