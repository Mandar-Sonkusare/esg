import { useEffect, useState } from "react";
import "./navbar.css";

function AuthNavbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => navigateTo("/home")}>
          <div className="brand-icon">📊</div>
          <h3 className="navbar-title">ESG Dashboard</h3>
        </div>
        
        <nav className="nav-links">
          <button 
            className="nav-button"
            onClick={() => navigateTo("/home")}
          >
            <span className="nav-icon">🏠</span>
            Home
          </button>
          <button 
            className="nav-button"
            onClick={() => navigateTo("/dashboard")}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button 
            className="nav-button"
            onClick={() => navigateTo("/esg")}
          >
            <span className="nav-icon">📝</span>
            Fill a form
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AuthNavbar;