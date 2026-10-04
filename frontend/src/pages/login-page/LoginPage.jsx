import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { FashionDoodles, FieldIcon } from "../../Components/AuthVisuals.jsx";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin("/api/users/login");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = await login({ email, password });

        if (user) {
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <main className="log-in">
            <section className="signup-card login-card" aria-labelledby="login-title">
                <div className="signup-card__wash" aria-hidden="true" />
                <FashionDoodles />

                <div className="signup-content">
                    <h1 id="login-title">Welcome back!</h1>

                    <form className="signup-form login-form" onSubmit={handleSubmit}>
                        <label className="signup-field">
                            <FieldIcon kind="email" />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
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
                                placeholder="Password"
                                aria-label="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </label>

                        <Link className="login-forgot-link" to="/forgot-password">
                            Forgot your password?
                        </Link>

                        {error && (
                            <p className="signup-error" role="alert">{error}</p>
                        )}

                        <button className="signup-submit" type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in…" : "Log in"}
                        </button>

                        <p className="login-signup-prompt">
                            Don’t have an account yet? <Link to="/signup">Sign up here</Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;
