import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", { email, password });

      alert("Registration successful! Please login.");
      
      // redirect to login
      window.location.href = "/login";
    } catch (err) {
      console.error("REGISTRATION ERROR:", err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="register-page">
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <h2 className="register-title">Create Account</h2>
              <p className="register-subtitle">Join ESG Dashboard to track your sustainability metrics</p>
            </div>

            <div className="register-form">
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>

              <button 
                onClick={handleRegister} 
                disabled={loading || !email || !password || !confirmPassword}
                className="register-button"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="register-footer">
              <p className="footer-text">
                Already have an account? <a href="/login" className="footer-link">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Register;