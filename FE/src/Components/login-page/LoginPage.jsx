

import {useState} from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


function Login () {

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    const handleSubmit = (event) => {
        event.preventDefault ();

        const loginInformation = {
            Email: email,
            Password: password

        };

        console.log (loginInformation);
    };

    return (
        <>
        <Header />
        <div className = "log-in">
            <h3> Welcome your Closis! </h3>

            <form onSubmit = {handleSubmit}>

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

                <button type= "submit"> log in </button>

                <p>
                    <a href= "/forgot-password"> forget your password?</a>
                </p>

                <p>
                    Don't have an account? {" "}
                    <Link to="/signup">Sign up</Link>
                </p>

            </form>

        </div>
        <Footer/>
    </>
    );


}

export default Login;
