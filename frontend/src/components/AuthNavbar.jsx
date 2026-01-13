import { useEffect, useState } from "react";
import { ConfirmDialog } from "./NotificationSystem";
import "./navbar.css";

function AuthNavbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const getInitials = (email) => {
    if (!email) return "U";
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email[0].toUpperCase();
  };

  const formatEmail = (email) => {
    if (!email) return "User";
    if (email.length > 25) {
      return email.substring(0, 22) + "...";
    }
    return email;
  };

  return (
    <>
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
            
            <div className="profile-dropdown-container">
              <button 
                className="profile-button"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="profile-avatar">
                  {getInitials(userEmail)}
                </div>
                <div className="profile-info">
                  <span className="profile-email">{formatEmail(userEmail)}</span>
                  <span className="profile-role">User</span>
                </div>
                <div className={`profile-chevron ${showProfileDropdown ? 'open' : ''}`}>
                  ▼
                </div>
              </button>

              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {getInitials(userEmail)}
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-email">{userEmail}</span>
                      <span className="dropdown-status">Active</span>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => navigateTo("/profile")}>
                      <span className="dropdown-icon">👤</span>
                      Profile Settings
                    </button>
                    <button className="dropdown-item" onClick={() => navigateTo("/dashboard")}>
                      <span className="dropdown-icon">📊</span>
                      My Dashboard
                    </button>
                    <button className="dropdown-item" onClick={() => navigateTo("/esg")}>
                      <span className="dropdown-icon">📝</span>
                      Submit Data
                    </button>
                    <button className="dropdown-item" disabled>
                      <span className="dropdown-icon">📄</span>
                      Reports
                      <span className="coming-soon">Soon</span>
                    </button>
                    <button className="dropdown-item" disabled>
                      <span className="dropdown-icon">⚙️</span>
                      Settings
                      <span className="coming-soon">Soon</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-footer">
                    <button 
                      className="dropdown-item logout-item"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowLogoutConfirm(true);
                      }}
                    >
                      <span className="dropdown-icon">🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        type="warning"
        onConfirm={handleLogout}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}

export default AuthNavbar;