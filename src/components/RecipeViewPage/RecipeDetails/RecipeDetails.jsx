// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors.js";
import { selectCurrentRecipes } from "../../../redux/recipes/selectors.js";
import {
  addFavorite,
  removeFavorite,
} from "../../../redux/favourite/operations.js";
import styles from "./RecipeDetails.module.css";
import clsx from "clsx";
import NotFound from "../NotFound/NotFound.jsx";
import { useEffect, useState } from "react";
import { fetchIngredients } from "../../../redux/ingredients/operations";
import { selectIngredients } from "../../../redux/ingredients/selectors";
import ErrorWhileSaving from "../../ErrorWhileSaving/ErrorWhileSaving.jsx";
// пуш повідомлення
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const RecipeDetails = () => {
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const ingredientsList = useSelector(selectIngredients) || [];
  const recipe = useSelector(selectCurrentRecipes);

  console.log("recipe", recipe);

  useEffect(() => {
    if (!Array.isArray(ingredientsList) || ingredientsList.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsList]);

  // Якщо рецепт не завантажився — NotFound
  if (!recipe) return <NotFound />;

  const isAuth = Boolean(user);
  const isFavorite = user?.favorites?.includes(recipe._id);

  const handleFavoriteClick = async () => {
    if (!isAuth) {
      // navigate("/login");
      // return;
      setShowModal(true);
      return;
    }

    try {
      if (isFavorite) {
        await dispatch(removeFavorite(recipe._id)).unwrap();
        toast.success("Recipe removed from favorites ✅");
      } else {
        await dispatch(addFavorite(recipe._id)).unwrap();
        toast.success("Recipe added to favorites ❤️");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong while saving ❌");
    }

    if (isFavorite) {
      dispatch(removeFavorite(recipe._id));
    } else {
      dispatch(addFavorite(recipe._id));
    }
  };

  return (
    <div className={styles.container}>
      {/* Заголовок + картинка */}
      <div className={styles.wrapperImg}>
        <div className={styles.containerImg}>
          <img
            src={recipe.thumb || recipe.imageUrl}
            alt={recipe.title || "Recipe image"}
            loading="lazy"
          />
        </div>
        <h1 className={styles.title}>{recipe.title || "Untitled"}</h1>
      </div>

      <div className={styles.recipeLayout}>
        {/* General information */}
        <div className={styles.generalInfobutton}>
          <div className={styles.generalInfo}>
            <h3 className={styles.geninfoTitle}>General information</h3>
            <p className={styles.genInfoText}>
              <span className={styles.recipeinfovalue}>Category: </span>
              {recipe.category || "-"}
            </p>
            <p className={styles.genInfoText}>
              <span className={styles.recipeinfovalue}>Cooking time: </span>
              {recipe.time ? `${recipe.time} minutes` : "-"}
            </p>
            <p className={styles.genInfoText}>
              <span className={styles.recipeinfovalue}>Caloric content: </span>
              {recipe.cals
                ? `Approximately ${recipe.cals} kcal per serving`
                : "-"}
            </p>
          </div>

          {/* Кнопка Save */}
          <button
            type="button"
            className={clsx(
              styles.saveButton,
              isFavorite && styles.iconSaveFavorite
            )}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className={clsx(
                styles.flagIconSave,
                isFavorite && styles.flagIconUnsave
              )}
            >
              <use href="/icons.svg#icon-flag" />
            </svg>
            {isFavorite ? "Unsave" : "Save"}
          </button>
        </div>

        <div className={styles.leftContent}>
          {/* About */}
          <div className={styles.sectionabout}>
            <h2>About recipe</h2>
            <p className={styles.textabout}>
              {recipe.description || "No description available."}
            </p>
          </div>

          {/* Ingredients */}
          <div className={styles.sectioningredients}>
            <h2>Ingredients:</h2>
            <ul className={styles.ingredientsList}>
              {Array.isArray(recipe.ingredients) &&
              recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((item) => {
                  const ingredient = ingredientsList.find(
                    (ing) => ing._id === item.id
                  );
                  return (
                    <li key={item.id}>
                      <p>
                        <span className={styles.ingname}>
                          {ingredient
                            ? "• " + ingredient.name
                            : "Unknown ingredient"}{" "}
                          -{" "}
                        </span>
                        {item.measure || "-"}
                      </p>
                    </li>
                  );
                })
              ) : (
                <li>No ingredients provided.</li>
              )}
            </ul>
          </div>

          {/* Steps */}
          <section className={styles.sectionsteps}>
            <h2>Preparation Steps:</h2>
            <div className={styles.steps}>
              {recipe.instructions ? (
                recipe.instructions
                  .split(/\r?\n/)
                  .filter((step) => step.trim())
                  .map((step, i) => (
                    <p key={i} className={styles.stepItem}>
                      {step.trim()}
                    </p>
                  ))
              ) : (
                <p>No instructions provided.</p>
              )}
            </div>
          </section>
        </div>
      </div>
      {showModal && <ErrorWhileSaving onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default RecipeDetails;
