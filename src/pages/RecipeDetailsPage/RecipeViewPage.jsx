import { useParams } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipesById } from "../redux/recipes/operations.js";
import { selectRecipesError } from "../redux/recipes/selectors.js";
// import ErrorPage from "../ErrorPage/ErrorPage";
// import styles from "./RecipeViewPage.module.css";
import NotFound from "../components/RecipeViewPage/NotFound/NotFound.jsx";

const RecipeDetails = lazy(() =>
  import("../components/RecipeDetailsPage/RecipeDetails/RecipeDetails.jsx")
);

const RecipeViewPage = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const error = useSelector(selectRecipesError);
  // const isLoading = useSelector(selectRecipesIsLoadingCurrentRecipe);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipesById(recipeId));
    }
  }, [dispatch, recipeId]);

  if (error) return <NotFound />;

  return (
    <Suspense fallback={<p>Loading recipe...</p>}>
      <RecipeDetails />
    </Suspense>
  );
  //   const { id } = useParams();
  //   const [recipe, setRecipe] = useState(null);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchRecipe = async () => {
  //       try {
  //         const res = await fetch(
  //           `https://tasteoramaapi.onrender.com/api/recipes/${id}`
  //         );
  //         if (!res.ok) {
  //           throw new Error("Recipe not found");
  //         }
  //         const data = await res.json();
  //         setRecipe(data);
  //       } catch (err) {
  //         setError(err.message);
  //       }
  //     };
  //     fetchRecipe();
  //   }, [id]);

  //   if (error) {
  //     return <ErrorPage code={404} message={error} />;
  //   }

  //   if (!recipe) {
  //     return <p className={styles.loading}>Loading...</p>;
  //   }

  //   return (
  //     <div className={styles.container}>
  //       <h1 className={styles.hiddenTitle}>RecipeDetailsPage</h1>

  //       <img src={recipe.thumb} alt={recipe.title} className={styles.image} />

  //       <h2 className={styles.title}>{recipe.title}</h2>

  //       <div className={styles.info}>
  //         <h3 className={styles.lowerHeaderTitle}>General informations</h3>
  //         <p className={styles.infoText}>
  //           <strong>Category:</strong> {recipe.category}
  //         </p>
  //         <p className={styles.infoText}>
  //           <strong>Cooking time:</strong> {recipe.time}
  //         </p>
  //       </div>

  //       <div className={styles.description}>
  //         <h2>About recipe</h2>
  //         <p>{recipe.description}</p>
  //       </div>

  //       <div className={styles.ingredients}>
  //         <h2>Ingredients:</h2>
  //         <ul>
  //           {recipe.ingredients.map((item, idx) => (
  //             <li key={idx}>
  //               {item.id?.title || "Unknown ingredient"} — {item.measure}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>

  //       <div className={styles.instructions}>
  //         <h2>Preparation Steps:</h2>
  //         <p>{recipe.instructions}</p>
  //       </div>

  //       <button className={styles.saveButton}>Save</button>
  //     </div>
  //   );
};

export default RecipeViewPage;
