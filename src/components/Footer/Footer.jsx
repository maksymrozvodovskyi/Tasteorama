import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import css from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuth = Boolean(user);

  const hideAccountLink = ["/login", "/register"].includes(location.pathname);

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />
        <p className={css.copyright}>
          © 2025 CookingCompanion. All rights reserved.
        </p>
        <div className={css.nav}>
          <Link to="/recipes" className={css.link}>
            Recipes
          </Link>
          {!hideAccountLink && (
            <Link to={isAuth ? "/profile" : "/login"} className={css.link}>
              Account
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
