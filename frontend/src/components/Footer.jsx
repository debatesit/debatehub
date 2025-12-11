import styles from './css/Footer.module.css'
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.sitefooter}>
      <p>© {currentYear} DebateHub |{" "}
        <a href="https://github.com/debatesit">
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;