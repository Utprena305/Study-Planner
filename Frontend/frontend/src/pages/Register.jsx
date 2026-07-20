import { useState } from "react";
import { registerUser } from "../service/Api";

import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo_2.png";
import illustration from "../assets/images/study.png";
import "./Login.css";

function Register() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await registerUser({
      fullname,
      email,
      password,
    });

    alert(response.data.message);

    navigate("/");

  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
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
              <h1>Create Account</h1>
              <p className="welcome-text">Create your account to start planning smarter.</p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
  type="text"
  placeholder="Full Name"
  value={fullname}
  onChange={(e) => setFullname(e.target.value)}
  required
/>
            </label>

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

            <label>
              Confirm Password
              <input
  type="password"
  placeholder="Confirm your password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  required
/>
            </label>

            <button type="submit" className="login-button">
              Register
            </button>
          </form>

          <p className="login-footer">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;