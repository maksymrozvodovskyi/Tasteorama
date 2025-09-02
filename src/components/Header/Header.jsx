import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import BurgerMenu from "./BurgerMenu/BurgerMenu.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import css from "./Header.module.css";
import { toast } from "react-toastify";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors.js";
import { logoutUserThunk } from "../../redux/auth/operations.js";
import { fetchRecipes } from "../../redux/recipesList/operations.js";
import { clearitems } from "../../redux/recipesList/slice.js";
import { resetFilters, setTitleFilter } from "../../redux/filters/slice.js";
import { selectSearchQuery } from "../../redux/filters/selectors.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      toast.success("Logout successfull!");
      dispatch(resetFilters());
      dispatch(clearitems());
      dispatch(fetchRecipes());
    } catch (error) {
      toast.error("Logout error " + error);
    } finally {
      setMenuOpen(false);
      navigate("/");
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <BurgerMenu open={menuOpen} setOpen={setMenuOpen} />

        <div className={css.desktopNav}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => {}}
            onLogout={handleLogout}
            isMobile={false}
          />
        </div>
      </div>

      {menuOpen && (
        <div className={`${css.mobileMenu} ${css.open}`}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => setMenuOpen(false)}
            onLogout={handleLogout}
            isMobile={true}
          />
        </div>
      )}
    </header>
  );
}
