import { useDispatch, useSelector } from "react-redux";
import { selectTotalRecipes } from "../../redux/recipesList/selectors";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchIngredients } from "../../redux/ingredients/operations";
import { fetchCategories } from "../../redux/categories/operations";
import {
  setCategoryFilter,
  setIngredientsFilter,
  resetFilters,
} from "../../redux/filters/slice";

const Filters = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const recipesAmount = useSelector(selectTotalRecipes);
  const ingredients = useSelector(selectIngredients);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchCategories());
  }, [dispatch]);

  const ingredientsOptions = ingredients.map((ingredient) => ({
    value: ingredient.name,
    label: ingredient.name,
  }));

  const categoriesOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setSelectedCategory(null);
    setSelectedIngredients([]);
  };

  const onCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    dispatch(setCategoryFilter(selectedOption ? selectedOption.value : ""));
  };

  const onIngredientsChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions || []);
    const ingredientValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    dispatch(setIngredientsFilter(ingredientValues));
  };

  const animatedComponents = makeAnimated();
  return (
    <div>
      <p>{recipesAmount} recipes</p>
      <div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
        <Select
          components={animatedComponents}
          options={categoriesOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="Category"
          isClearable
        />
        <Select
          components={animatedComponents}
          options={ingredientsOptions}
          value={selectedIngredients}
          onChange={onIngredientsChange}
          placeholder="Ingredient"
          isMulti
        />
      </div>
    </div>
  );
};

export default Filters;
