import { useEffect, useState } from "react";
import "./navbar.css";

function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="brand-icon">📊</div>
          <h3 className="navbar-title">ESG Dashboard</h3>
        </div>

        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
