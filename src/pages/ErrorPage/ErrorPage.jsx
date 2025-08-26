import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage({ code = 404, message = "Page not found" }) {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>{code}</h2>
      <p className={styles.errorMessage}>{message}</p>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
}
