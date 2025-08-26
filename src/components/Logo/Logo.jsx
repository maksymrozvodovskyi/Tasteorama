import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <NavLink to="/">
      <div className={css.logo}>
        <div className={css.iconBox}>
          <svg className={css.logoIcon}>
            <use href="/icons.svg#icon-logo" />
          </svg>
        </div>
        <span className={css.logoText}>Tasteorama</span>
      </div>
    </NavLink>
  );
}