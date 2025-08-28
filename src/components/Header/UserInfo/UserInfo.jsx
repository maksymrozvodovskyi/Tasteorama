import { useState } from "react";
import css from "./UserInfo.module.css";
import ConfirmLogoutModal from "../ConfirmLogoutModal/ConfirmLogoutModal";
import { selectUser } from "../../../redux/auth/selectors";
import { useSelector } from "react-redux";

export default function UserInfo({ userName = "User", onLogout, className }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className={`${css.wrapper} ${className}`}>
      <div className={css.avatar}>{user.name || "?"}</div>
      <span className={css.name}>{userName}</span>
      <div className={css.divider}></div>
      <button
        className={css.logoutBtn}
        onClick={() => setShowModal(true)}
        aria-label="Logout"
      >
        <svg className={css.logoutIcon}>
          <use href="/icons.svg#icon-logout" />
        </svg>
      </button>

      {showModal && (
        <ConfirmLogoutModal
          onClose={() => setShowModal(false)}
          onConfirm={onLogout}
        />
      )}
    </div>
  );
}
