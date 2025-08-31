import SearchBox from "../SearchBox/SearchBox";
import styles from "./Hero.module.css";

export default function Hero({ onSearch }) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Plan, Cook, and Share Your Flavors</h1>
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}
