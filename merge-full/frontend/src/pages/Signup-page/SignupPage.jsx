import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { FieldIcon } from "../../Components/AuthVisuals.jsx";
import AuthMascot from "../../Components/AuthMascot/AuthMascot.jsx";

const SignUp = ({ setIsAuthenticated }) => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signup, isLoading, error } = useSignup("/api/users/signup");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await signup({ name: username, email, password });

        if (user) {
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <main className="Sign-up">
            <section className="signup-card" aria-labelledby="signup-title">
                <AuthMascot message="Hi new friend! Let's fill your closet" />

                <div className="signup-content">
                    <h1 id="signup-title">Create account</h1>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <label className="signup-field">
                            <FieldIcon kind="name" />
                            <input
                                name="username"
                                type="text"
                                placeholder="Full name"
                                aria-label="Full name"
                                autoComplete="name"
                                value={username}
                                onChange={(event) => setUserName(event.target.value)}
                                required
                            />
                        </label>

                        <label className="signup-field">
                            <FieldIcon kind="email" />
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                aria-label="Enter email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </label>

                        <label className="signup-field">
                            <FieldIcon kind="password" />
                            <input
                                name="password"
                                type="password"
                                placeholder="Create password"
                                aria-label="Create password"
                                autoComplete="new-password"
                                minLength={8}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </label>

                        <div className="signup-account-row">
                            <span>Already have an account? <span aria-hidden="true">→</span></span>
                            <Link to="/login">Log in</Link>
                        </div>

                        {error && (
                            <p className="signup-error" role="alert">{error}</p>
                        )}

                        <button className="signup-submit" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating account…" : "Sign up"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default SignUp;
