import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import BurgerMenu from "./BurgerMenu/BurgerMenu.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import css from "./Header.module.css";
import { toast } from "react-toastify";
import { selectAuthIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { logoutUserThunk } from "../../redux/auth/operations.js";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = useSelector(selectAuthIsLoggedIn);
    const user = useSelector(selectUser);
    console.log(user);
    const userName = user?.name;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUserThunk()).unwrap();
            toast.success("Logout successfull!");
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
                        userName={userName}
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
                        userName={userName}
                        onLogout={handleLogout}
                        isMobile={true}
                    />
                </div>
            )}
        </header>
    );
}