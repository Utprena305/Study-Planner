import { useState } from "react";
import { forgotPassword } from "../service/Api";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo_2.png";
import illustration from "../assets/images/study.png";
import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Button clicked!");

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const response = await forgotPassword({
            email,
            password,
        });

        alert(response.data.message);

        navigate("/");

    } catch (error) {
        alert(error.response?.data?.message || "Password Reset Failed");
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
              <h1>Reset Password</h1>
              <p className="welcome-text">Create a new password for your account.</p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
/>
            </label>

            <label>
              New Password
              <input
    type="password"
    placeholder="New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
/>
            </label>

            <label>
              Confirm Password
              <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
/>
            </label>

            <button type="submit" className="login-button">
              Reset Password
            </button>
          </form>

          <p className="login-footer">
            <Link to="/">Back to Login</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default ForgotPassword;