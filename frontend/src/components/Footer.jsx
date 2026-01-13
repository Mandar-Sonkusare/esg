import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-icon">📊</span>
                <h3 className="footer-title">ESG Dashboard</h3>
              </div>
              <p className="footer-description">
                Comprehensive ESG management platform for sustainable business practices.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><a href="/home" className="footer-link">Home</a></li>
              <li><a href="/dashboard" className="footer-link">Dashboard</a></li>
              <li><a href="/esg" className="footer-link">ESG Form</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">ESG Guide</a></li>
              <li><a href="#" className="footer-link">Best Practices</a></li>
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} ESG Dashboard. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <span className="footer-made-with">
              Made with 💚 for sustainable business
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;