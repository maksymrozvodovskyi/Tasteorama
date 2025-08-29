import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";
import css from "./AddRecipePage.module.css";

export default function AddRecipePage() {
  return (
    <div className={css.container}>
      <h1 className={css.titlePage}>Add Recipe</h1>
      <AddRecipeForm />
    </div>
  );
}
