import SearchBox from "../SearchBox/SearchBox";
import styles from "./Hero.module.css";
import css from "../../styles/container.module.css";

export default function Hero({ onSearch }) {
  return (
    <section className={styles.hero}>
      <div className={css.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Plan, Cook, and Share Your Flavors</h1>
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}

// export default function Hero({ onSearch }) {
//   return (
//     <section className={styles.hero}>
//       {/* mobile */}
//       <img
//         src="../../img/HeroSearchBox/banner-mob.jpg"
//         srcSet="../../img/HeroSearchBox/banner-mob@2x.jpg 2x"
//         alt="CookingBanner"
//         className={styles.mobileImage}
//       />

//       <div className={styles.content}>
//         <h1 className={styles.title}>Plan, Cook, and Share Your Flavors</h1>
//         <SearchBox onSearch={onSearch} />
//       </div>
//     </section>
//   );
// }
