import { lazy, Suspense } from "react";
import styles from "./AddRecipePage.module.css";

const AddRecipeForm = lazy(() =>
  import("../../components/AddRecipeForm/AddRecipeForm.jsx")
);

export default function AddRecipePage() {
  return (
    <section>
      <div className={styles.container}>
        <h1 className={styles.titlePage}>Add Recipe</h1>
        <Suspense fallback={<div>Loading form...</div>}>
          <AddRecipeForm />
        </Suspense>
      </div>
    </section>
  );
}
