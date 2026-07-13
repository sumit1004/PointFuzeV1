import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">Point<span className="text-primary">Fuze</span></h2>
          <p className="text-small">The Fastest Esports Tournament Result Operating System.</p>
        </div>
        <div className="footer-links">
          <a href="#" className="nav-link">Terms of Service</a>
          <a href="#" className="nav-link">Privacy Policy</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-small">&copy; {new Date().getFullYear()} PointFuze. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
