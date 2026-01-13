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
        <h3 className="navbar-title">ESG Dashboard</h3>
        
        <nav className="nav-links">
          <button 
            className="nav-button"
            onClick={() => navigateTo("/dashboard")}
          >
            Dashboard
          </button>
          <button 
            className="nav-button"
            onClick={() => navigateTo("/esg")}
          >
            Fill a form
          </button>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>

        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}

export default AuthNavbar;