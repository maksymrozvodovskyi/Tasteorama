import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage";
import styles from "./RecipeDetailsPage.module.css";

const RecipeViewPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) {
          throw new Error("Recipe not found");
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) {
    return <ErrorPage code={404} message={error} />;
  }

  if (!recipe) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.hiddenTitle}>RecipeDetailsPage</h1>

      <img src={recipe.thumb} alt={recipe.title} className={styles.image} />

      <h1 className={styles.title}>{recipe.title}</h1>

      <div className={styles.info}>
        <p>
          <strong>Category:</strong> {recipe.category}
        </p>
        <p>
          <strong>Cooking time:</strong> {recipe.time}
        </p>
      </div>

      <div className={styles.description}>
        <h2>About recipe</h2>
        <p>{recipe.description}</p>
      </div>

      <div className={styles.ingredients}>
        <h2>Ingredients:</h2>
        <ul>
          {recipe.ingredients.map((item, idx) => (
            <li key={idx}>
              {item.id?.title || "Unknown ingredient"} — {item.measure}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.instructions}>
        <h2>Preparation Steps:</h2>
        <p>{recipe.instructions}</p>
      </div>

      <button className={styles.saveButton}>Save</button>
    </div>
  );
};

export default RecipeViewPage;
