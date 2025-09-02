import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectAvatar } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import ModalAuthentication from "../ModalAuthentication/ModalAuthentication";
import css from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const user = useSelector(selectAvatar);
  const isAuth = Boolean(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideAccountLink = ["/login", "/register"].includes(location.pathname);
  const handleAccountClick = () => {
    if (isAuth) {
      window.location.href = "/profile/own";
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />
        <p className={css.copyright}>
          © 2025 CookingCompanion. All rights reserved.
        </p>
        <div className={css.nav}>
          <Link to="/" className={css.link}>
            Recipes
          </Link>

          {!hideAccountLink && (
            <Link
              to="/profile"
              className={css.link}
              onClick={handleAccountClick}
            >
              Account
            </Link>
          )}

          {isModalOpen && (
            <ModalAuthentication onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
