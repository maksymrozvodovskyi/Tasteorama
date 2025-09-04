import { Link } from "react-router-dom";
import css from "./RecipeCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favourite/operations";
import { useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import ErrorWhileSaving from "../ErrorWhileSaving/ErrorWhileSaving";
import { setAuthToken } from "../../services/favoritesAPI";

export default function RecipeCard({ recipe, mode = "default" }) {
  const [showModal, setShowModal] = useState(false);
  const { _id, title, thumb, time, description = "", calories } = recipe;

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.recipes.favoriteItems) || [];
  const isFavorite = favorites.some((item) => String(item._id) === String(_id));

  const token = useSelector((state) => state.auth.accessToken);
  const isLoggedIn = Boolean(token);

  const handleToggleFav = async () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    try {
      setAuthToken(token);

      if (isFavorite) {
        await dispatch(removeFavorite(_id)).unwrap();
        iziToast.info({
          message: "Recipe removed from favorites",
          position: "topRight",
        });
      } else {
        await dispatch(addFavorite(_id)).unwrap();
      }
    } catch {
      iziToast.error({
        title: "Error",
        message: "Failed to update favorites",
        position: "topRight",
      });
    }
  };

  const handleRemoveFav = async () => {
    try {
      setAuthToken(token);
      await dispatch(removeFavorite(_id)).unwrap();
    } catch {
      iziToast.error({
        title: "Error",
        message: "Failed to remove recipe from favorites",
        position: "topRight",
      });
    }
  };

  return (
    <div>
      <div className={css.card}>
        <img src={thumb} alt={title} loading="lazy" className={css.img} />

        <div className={css.header}>
          <h3>{title}</h3>
          <span className={css.timeBox}>
            <svg width="24" height="24" className={css.icon}>
              <use href="/icons.svg#icon-clock" className={css.clock} />
            </svg>
            <p className={css.time}>{time ? `${time}` : "—"}</p>
          </span>
        </div>

        <div className={css.desBox}>
          <p className={css.des}>{description}</p>
          <p>{calories != null ? `~${calories} cals` : "—"}</p>
        </div>

        <div className={css.btnBox}>
          <Link
            to={`/recipes/${_id}`}
            className={`${css.moreBtn} ${mode === "my" ? css.moreBtnFull : ""}`}
          >
            Learn more
          </Link>

          {/* кнопки залежно від режиму */}

          {mode === "default" && (
            <button
              type="button"
              onClick={handleToggleFav}
              aria-pressed={isFavorite}
              className={`${css.saveBtn} ${isFavorite ? css.active : ""}`}
            >
              <svg width="24" height="24" className={css.icon}>
                <use xlinkHref="/icons.svg#icon-flag" />
              </svg>
            </button>
          )}

          {mode === "favorites" && (
            <button
              type="button"
              onClick={handleRemoveFav}
              className={`${css.saveBtn} ${css.removeBtn}`}
            >
              <svg width="24" height="24" className={css.icon}>
                <use href="/icons.svg#icon-delete" />
              </svg>
            </button>
          )}
        </div>
        {showModal && <ErrorWhileSaving onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
