import css from './Header.module.css';
import Logo from '../Logo/Logo.jsx';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';
import { selectUser, selectIsLoggedIn } from '../../redux/auth/selectors.js';

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleModalMenu = () =>
        setIsMenuOpen(!isMenuOpen);
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={css.wraper}>
            <div className={`${css.header} container`}>
                <Logo />
                <nav className={`${css.nav} ${isMenuOpen ? css.menuOpen : css.menuClose}`}>
                    {isMenuOpen && (
                        <div className={css.modalLogoWraper}>
                            <Logo />
                            <button onClick={toggleModalMenu} className={css.closeModalMenu}>
                                <svg>
                                    <use href='/icons.svg#icon-close'></use>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className={css.navItems}>
                        <NavLink className={({ isActive }) => (isActive ? css.active : "")}
                            onClick={() => setIsMenuOpen(false)}
                            to={"/"}
                        >
                            Recipes
                        </NavLink>
                        {isLoggedIn ? (
                            <NavLink className={({ isActive }) => (isActive ? css.active : "")}
                                onClick={() => setIsMenuOpen(false)}
                                to={"/profile/favorites"}
                            >
                                My profile
                            </NavLink>
                        ) : (
                            <NavLink className={({ isActive }) => (isActive ? css.active : "")}
                                onClick={() => setIsMenuOpen(false)}
                                to={"/auth/login"}
                            >
                                Log in
                            </NavLink>
                        )}
                        {isLoggedIn ? (
                            <NavLink className={({ isActive }) => `${isActive && css.active} ${css.btn}`
                            }
                                onClick={() => setIsMenuOpen(false)}
                                to={"/add-recipe"}
                            >
                                Add Recipe
                            </NavLink>
                        ) : (
                            <NavLink className={({ isActive }) => `${isActive && css.active} ${css.btn}`
                            }
                                onClick={() => setIsMenuOpen(false)}
                                to={"/auth/register"}
                            >
                                Register
                            </NavLink>
                        )}
                        {isLoggedIn && (
                            <div className={css.userNav}>
                                {" "}
                                <div className={css.userInfo}>
                                    {" "}
                                    <span className={css.userIcon}>{user.name[0].toUpperCase()}</span> <p>{user.name}</p>
                                </div>{" "}
                                <div className={css.br}></div>
                                <button onClick={handleLogout}>
                                    <svg className={css.icon}>
                                        <use href={`/icons.svg#icon-log-out`}></use>
                                    </svg>
                                </button>{" "}
                            </div>
                        )}
                    </div>
                </nav>
                <button
                    onClick={toggleModalMenu}
                    className={`${isMenuOpen ? css.burgerHidden : css.burgerBtn}`}
                >
                    <svg className={css.icon}>
                        <use href={`/icons.svg#icon-burger`}></use>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Header;