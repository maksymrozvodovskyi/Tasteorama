import { useState, useEffect } from "react";
import css from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 600) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className={css.scrollToTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg className={css.arrowIcon}>
            <use href="/icons.svg#icon-scroll-arrow"></use>
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
