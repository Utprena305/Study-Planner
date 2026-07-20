import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/Api";
import logoImage from "../assets/images/logo_2.png";
import illustration from "../assets/images/study.png";
import "./Login.css";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
  event.preventDefault();

  console.log("Login button clicked");
  console.log({ email, password });

  try {
    const response = await loginUser({
      email,
      password,
    });

    console.log("SUCCESS:", response.data);

    localStorage.setItem("token", response.data.token);
    alert("Login Successful!");
    navigate("/dashboard");

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("SERVER RESPONSE:", error.response);

    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <main className="login-page">
      <div className="login-grid">
        <section className="login-visual">
          <div className="visual-card">
            <img src={illustration} alt="Study planner illustration" />

          </div>
        </section>

        <section className="login-card">
          <div className="login-header">
            <div className="brand-icon">
              <img src={logoImage} alt="Study Planner logo" />
            </div>
            <div>
              <h1>Study Planner</h1>
              <p>Stay organized and focused</p>
              <p className="welcome-text">
                Welcome back! Log in to continue your study journey.
              </p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>

            <div className="login-actions">
              <Link to="/forgot-password" className="forgot-link">
                Forget Password?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

            <p className="login-footer">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
            </p>
        </section>
      </div>
    </main>
  );
}

export default Login;