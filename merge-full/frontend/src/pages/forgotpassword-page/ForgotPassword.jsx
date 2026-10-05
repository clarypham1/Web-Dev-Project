import { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgetPassword";
import { FieldIcon } from "../../Components/AuthVisuals.jsx";
import AuthMascot from "../../Components/AuthMascot/AuthMascot.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { forgotPassword, isLoading, error, message } = useForgotPassword("/api/users/forgot-password");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await forgotPassword(email);
    };

    return (
        <main className="forgot-password">
            <section className="signup-card forgot-card" aria-labelledby="forgot-title">
                <AuthMascot message="Oops! It happens to everyone" />

                <div className="signup-content">
                    <h1 id="forgot-title">Forgot your password?</h1>
                    <p className="forgot-intro">
                        Enter your email address and we’ll send you instructions to reset your password.
                    </p>

                    <form className="signup-form forgot-form" onSubmit={handleSubmit}>
                        <label className="signup-field">
                            <FieldIcon kind="email" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                aria-label="Enter email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </label>

                        {error && <p className="forgot-feedback forgot-feedback--error" role="alert">{error}</p>}
                        {message && <p className="forgot-feedback forgot-feedback--success" role="status">{message}</p>}

                        <button className="signup-submit" type="submit" disabled={isLoading}>
                            {isLoading ? "Sending…" : "Send reset link"}
                        </button>
                    </form>

                    <Link className="forgot-back-link" to="/login">← Back to login</Link>
                </div>
            </section>
        </main>
    );
};

export default ForgotPassword;
