import { useState } from "react";
import css from "./UserInfo.module.css";
import ConfirmLogoutModal from "../ConfirmLogoutModal/ConfirmLogoutModal";
import { selectUserName } from "../../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { selectAvatar } from "../../../redux/auth/selectors";

export default function UserInfo({ onLogout, className }) {
  const [showModal, setShowModal] = useState(false);
  const hasAvatar = useSelector(selectAvatar);
  const userName = useSelector(selectUserName);

  return (
    <div className={`${css.wrapper} ${className}`}>
      <div className={css.avatar}>
        {userName ? userName.charAt(0).toUpperCase() : "?"}
      </div>
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
