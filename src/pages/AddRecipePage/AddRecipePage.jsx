import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";
import "./AddRecipePage.styles.css";

export default function AddRecipePage() {
  return (
    <div className="container">
      <h1 className="titlePage">Add Recipe</h1>
      <AddRecipeForm />
    </div>
  );
}
