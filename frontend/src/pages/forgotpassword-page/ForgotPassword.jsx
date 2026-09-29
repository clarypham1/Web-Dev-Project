
import {Link} from "react-router-dom";
import {useState} from "react";
import useForgotPassword from "../../hooks/useForgetPassword";

const ForgotPassword = () => {
    const [email, setEmail] = useState ("");
    const {forgotPassword, isLoading, error, message} = useForgotPassword("/api/users/forgot-password");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await forgotPassword(email);
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

                <button type="submit" disabled={isLoading}>
                    Enter
                </button>

            </form>

            {error && ( 
                <p className="error-message"> {error} </p> )}

            {message && (
                <p className="success-message"> 
                    {message}
                </p>
            )}

            <p>
                <Link to="/login">
                    ⬅️ back to login 
                </Link>
            </p>

        </main>
    );

}

export default ForgotPassword;