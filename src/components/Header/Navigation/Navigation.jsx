import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
import UserInfo from "../UserInfo/UserInfo.jsx";

export default function Navigation({
  isLoggedIn = false,
  closeMenu = () => {},
  userName = "",
  onLogout = () => {},
  isMobile = false,
}) {
  const location = useLocation();

   const isProfileActive = location.pathname.startsWith("/profile");

  return (
    <nav className={css.navGroup}>
      <NavLink
        to="/"
        end 
        className={({ isActive }) =>
          `${css.link} ${css.recipes} ${isActive ? css.active : ""}`
        }
        onClick={closeMenu}
      >
        Recipes
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink
            to="/login"
            end
            className={({ isActive }) =>
              `${css.link} ${css.login} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Log in
          </NavLink>
          <NavLink
            to="/register"
            end
            className={({ isActive }) =>
              `${css.linkBtn} ${css.register} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/profile/own"
            className={({ isActive }) =>
              `${css.link} ${css.profile} ${
                isActive || isProfileActive ? css.active : ""
              }`
            }
            onClick={closeMenu}
          >
            My Profile
          </NavLink>
          <div className={css.userInfo}>
            <UserInfo
              userName={userName}
              onLogout={onLogout}
              isMobile={isMobile}
            />
          </div>
          <NavLink
            to="/add-recipe"
            end
            className={({ isActive }) =>
              `${css.linkBtn} ${css.addRecipe} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Add Recipe
          </NavLink>
        </>
      )}
    </nav>
  );
}