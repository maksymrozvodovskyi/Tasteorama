import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import UserInfo from "../UserInfo/UserInfo.jsx";

export default function Navigation({
    isLoggedIn = false,
    closeMenu = () => { },
    userName = "",
    onLogout = () => { },
    isMobile = false,
}) {
    return (
        <nav className={css.navGroup}>
            <NavLink
                to="/"
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
                        className={({ isActive }) => 
                            `${css.link} ${css.login} ${isActive ? css.active : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Log in
                    </NavLink>
                    <NavLink
                        to="/register"
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
                            to="/my-recipes"
                            className={({ isActive }) => 
                                `${css.link} ${css.profile} ${isActive ? css.active : ""}`
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
                            className={`${css.linkBtn} ${css.addRecipe}`}
                            onClick={closeMenu}
                        >
                            Add Recipe
                        </NavLink>
                    </>
            )}
        </nav>
    )
}