import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors.js";
import { selectCurrentRecipes } from "../../../redux/recipes/selectors.js";
import {
  fetchAddRecipesToFavorite,
  fetchDeleteRecipesFromFavorite,
} from "../../../redux/recipes/operations.js";
import styles from "./RecipeDetails.module.css";
import clsx from "clsx";
import NotFound from "../NotFound/NotFound.jsx";
import { useEffect } from "react";
import { fetchIngredients } from "../../../redux/ingredients/operations";
import { selectIngredients } from "../../../redux/ingredients/selectors";

const RecipeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const ingredientsList = useSelector(selectIngredients) || [];
  const recipe = useSelector(selectCurrentRecipes);

  console.log(recipe);

  useEffect(() => {
    if (!Array.isArray(ingredientsList) || ingredientsList.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsList]);

  // Якщо рецепт не завантажився — NotFound
  if (!recipe) return <NotFound />;

  const isAuth = Boolean(user);
  const isFavorite = user?.favorites?.includes(recipe._id);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    if (isFavorite) {
      dispatch(fetchDeleteRecipesFromFavorite(recipe._id));
    } else {
      dispatch(fetchAddRecipesToFavorite(recipe._id));
    }
  };

  return (
    <>
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
            <h3 className={styles.recipeinform}>General information</h3>
            <p>
              <span className="recipeinfovalue">Category: </span>
              {recipe.category || "-"}
            </p>
            <p>
              <span className="recipeinfovalue">Cooking time: </span>
              {recipe.time ? `${recipe.time} minutes` : "-"}
            </p>
            <p>
              <span className="recipeinfovalue">Caloric content: </span>
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
            {isFavorite ? "Remove from favorites" : "Save to favorites"}
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
                            ? ingredient.name
                            : "Невідомий інгредієнт"}{" "}
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
    </>
  );
};

export default RecipeDetails;
