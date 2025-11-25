import './css/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>© {currentYear} DebateHub |{" "}
        <a href="https://github.com/debatesit" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;