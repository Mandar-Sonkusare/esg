import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      // 🔴 IMPORTANT: CLEAR OLD TOKENS FIRST
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // ✅ STORE NEW TOKENS
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userEmail", email);

      // redirect to home page
      window.location.href = "/home";
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Sign in to your ESG Dashboard</p>
            </div>

            <div className="login-form">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>

              <button 
                onClick={handleLogin} 
                disabled={loading || !email || !password}
                className="login-button"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            <div className="login-footer">
              <p className="footer-text">
                Don't have an account? <a href="/register" className="footer-link">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
