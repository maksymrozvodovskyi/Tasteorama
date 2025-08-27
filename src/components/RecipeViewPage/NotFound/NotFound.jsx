import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = ({ code = 404, message = "Page not found" }) => {
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.notfoundtitle}>{code}</h2>
      <p className={styles.notfoundMessage}>{message}</p>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
