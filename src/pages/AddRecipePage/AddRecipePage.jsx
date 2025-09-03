import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";
import styles from "./AddRecipePage.module.css";

export default function AddRecipePage() {
  return (
    <section>
      <div className={styles.container}>
        <h1 className={styles.titlePage}>Add Recipe</h1>
        <AddRecipeForm />
      </div>
    </section>
  );
}
