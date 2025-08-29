import css from "./BurgerMenu.module.css";

export default function BurgerMenu({ open, setOpen }) {
  return (
    <button
      className={open ? css.closeBtn : css.burgerBtn}
      onClick={() => setOpen(!open)}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? (
        <svg className={css.closeIcon}>
          <use href="/icons.svg#icon-close" />
        </svg>
      ) : (
        <svg className={css.burgerIcon}>
          <use href="/icons.svg#icon-burger" />
        </svg>
      )}
    </button>
  );
}
