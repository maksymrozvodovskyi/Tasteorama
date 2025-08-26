// components/RecipeCard/RecipeCard.jsx
import { Link } from "react-router-dom";
import css from "./RecipeCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favourite/operations";
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [showModal, setShowModal] = useState(false);
  const { _id, title, thumb, time, description = "", calories } = recipe;

  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.items.includes(_id)
  );

  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  const handleToggleFav = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(_id));
    } else {
      dispatch(addFavorite(_id));
    }
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} loading="lazy" className={css.img} />
      <div className={css.header}>
        <h3>{title}</h3>
        <span className={css.timeBox}>
          <svg width="14.25" height="14.25">
            <use href="../../../public/icons.svg#icon-clock" />
          </svg>
          <p className={css.time}>{time ? `${time}` : "—"}</p>
        </span>
      </div>
      <div className={css.desBox}>
        <p>{description}</p>
        <p>{calories != null ? `~${calories} cals` : "—"}</p>
      </div>
      <div className={css.btnBox}>
        <Link to={`/recipes/${_id}`} className={css.moreBtn}>
          Learn more
        </Link>
        <button
          type="button"
          onClick={handleToggleFav}
          aria-pressed={isFavorite}
          className={css.saveBtn}
        >
          <svg width="24" height="24">
            <use href="../../../public/icons.svg#icon-flag" />
          </svg>
        </button>
      </div>
      {showModal && "modal"};
    </div>
  );
}
