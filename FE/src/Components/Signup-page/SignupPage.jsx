

import {useState} from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


function SignUp () {

    const [username, setUserName] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [confirmpassword, setConfirmPassword] = useState ("");

    const handleSubmit = (event) => {
        event.preventDefault ();

        const SignUpInformation = {
            UserName: username,
            Email: email,
            Password: password,
            ConfirmPassword: confirmpassword

        };

        console.log (SignUpInformation);
    };

    return (
        <>
        <Header />
        <div className = "Sign-up">
            <h3> Welcome your Closis! </h3>

            <form onSubmit = {handleSubmit}>

                <input
                    name = "username"
                    placeholder = "your username"
                    type = "text"
                    value = {username}
                    onChange = {(event) => setUserName (event.target.value)}
                />
                <br/>

                <input
                    name = "email"
                    placeholder = "✉️ email"
                    type = "text"
                    value = {email}
                    onChange = {(event) => setEmail (event.target.value)}
                />
                <br />

                <input
                    name = "password"
                    placeholder = "🗝️ password"
                    type = "password"
                    value = {password}
                    onChange = {(event) => setPassword (event.target.value)}

                />
                <br />

                <input
                    name = "ConfirmPassword"
                    placeholder = "🗝️ confirm password"
                    type = "password"
                    value = {confirmpassword}
                    onChange = {(event) => setConfirmPassword (event.target.value)}

                />
                <br />

                <button type= "submit"> Sign Up </button>

                {/* <p>
                    <a herf= ""> Already have an account?</a>
                </p> */}

                <p>
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
