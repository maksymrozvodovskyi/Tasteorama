import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import notFoundImg from "../../../img/NotFoundImg.jpg";

const NotFound = ({ code = 404, message = "Recipe not found" }) => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.imgcontainer}>
        <img src={notFoundImg} loading="lazy" alt="Empty plate"></img>
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.notfoundtitle}>{code}</h2>
        <p className={styles.notfoundMessage}>{message}</p>
      </div>
      <Link to="/" className={styles.backButton}>
        <svg className={styles.backIcon}>
          <use href="/icons.svg#icon-arrow-back" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
