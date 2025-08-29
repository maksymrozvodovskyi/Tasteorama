import { useState } from "react";
import css from "./UserInfo.module.css";
import ConfirmLogoutModal from "../ConfirmLogoutModal/ConfirmLogoutModal";

export default function UserInfo({ onLogout, className }) {
  const [showModal, setShowModal] = useState(false);

  const state = JSON.parse(localStorage.getItem("persist:accessToken"));
  const name = JSON.parse(state.userName);

  return (
    <div className={`${css.wrapper} ${className}`}>
      <div className={css.avatar}>{name.charAt(0).toUpperCase() || "?"}</div>
      <span className={css.name}>{name}</span>
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
