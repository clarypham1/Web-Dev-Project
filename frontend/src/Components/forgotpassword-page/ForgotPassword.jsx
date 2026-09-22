
import {Link} from "react-router-dom";
import {useState} from "react";

function ForgotPassword () {
    const [email, setEmail] = useState ("");
    const [message, setMessage] = useState ("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage (
            "password reset information will be sent to this email."
        );
    };

    return (
        <main className = "forgot-password">
            <h2> Forgot your password?</h2>

            <p>
                Enter your email address for reset password.
            </p>

            <form onSubmit={handleSubmit}>

                <input 
                    type="email"
                    placeholder = "✉️ email"
                    value = {email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                
                />
                <br />

                <button type="submit">
                    Enter
                </button>

            </form>

            {message && (
                <p> {message}</p>
            )}

            <p>
                <Link to="/login">
                ⬅️ back to login </Link>
            </p>

        </main>
    );

}

export default ForgotPassword;