

import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";


function Login ({setIsLoggedIn}) {

    const navigate = useNavigate();

    //store email typed by user
    const [email, setEmail] = useState ("");
    // store the password typed by user
    const [password, setPassword] = useState ("");
    // store the error message (there is no error if it is empty)
    const [error, setError] = useState ("");




    const handleSubmit = (event) => {
        event.preventDefault (); // prevent the page form refreshing when the form is submitted

        setError("");  //clear previous error

        // store the log in information
        const loginInformation = {
            Email: email,
            Password: password

        };

        // lock login information for testing

        if (email !== "test@gmail.com" || password !== "12345678")
        {setError ("Incorrect email or password"); // show the error messge if email or password is incorrect
            return;
        }

        setIsLoggedIn(true);

        localStorage.setItem("isLoggedIn", "true");

        console.log (loginInformation); // show the login information in console
        navigate("/start");
    };

    return (
        <>
        <div className = "log-in">
            <h3> Welcome your Closis! </h3>

            {/* log in form   */}
            <form onSubmit = {handleSubmit}>

                {/* email input  */}
                <input
                    name = "email"
                    placeholder = "✉️ email"
                    type = "text"
                    value = {email}
                    onChange = {(event) => setEmail (event.target.value)} // update the email state when the user types
                    required // the user must enter email 
                />
                <br />

                {/* password input  */}
                <input
                    name = "password"
                    placeholder = "🗝️ password"
                    type = "password"
                    value = {password}
                    onChange = {(event) => setPassword (event.target.value)} //update the password state when the user types
                    required // the user must enter the password

                />
                <br />

                {/* display the error message only when the error state is not empty */}
                {error && (
                    <p className = "error-message">
                        {error}
                    </p>
                )}

                {/* submit log in form */}
                <button type= "submit"> log in </button>

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
