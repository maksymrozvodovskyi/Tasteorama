import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./ConfirmLogoutModal.module.css";

export default function ConfirmLogoutModal({ onClose, onConfirm }) {
  
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  

  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>
        <div className={css.content}>
          <h2 className={css.title}>Are you sure?</h2>
          <p className={css.text}>We will miss you!</p>
          <div className={css.action}>
            <button className={css.logoutBtn} onClick={onConfirm}>
              Log out
            </button>
            <button className={css.cancelBtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
