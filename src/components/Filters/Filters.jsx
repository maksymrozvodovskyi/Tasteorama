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
import { fetchRecipes } from "../../redux/recipesList/operations";
import css from "./Filters.module.css";
import { clearitems } from "../../redux/recipesList/slice";

const Filters = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    dispatch(clearitems());
    dispatch(resetFilters());
    setSelectedCategory(null);
    setSelectedIngredients([]);
    dispatch(fetchRecipes());
  };

  const onCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    dispatch(setCategoryFilter(selectedOption ? selectedOption.value : ""));
    dispatch(clearitems());
    dispatch(fetchRecipes());
  };

  const onIngredientsChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions || []);
    const ingredientValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    dispatch(setIngredientsFilter(ingredientValues));
    dispatch(clearitems());
    dispatch(fetchRecipes());
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) setIsFilterOpen(false);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const animatedComponents = makeAnimated();
  return (
    <div className={css.filtersSection}>
      <h2 className={css.title}>Recipes</h2>
      <div className={css.filtersContainerWrapper}>
        <div className={css.filtersContainer}>
          <p className={css.recipesCount}>{recipesAmount} recipes</p>

          <button
            type="button"
            className={css.toggleBtn}
            onClick={toggleFilters}
          >
            Filters
            <svg className={css.filtersIcon}>
              {isFilterOpen ? (
                <use href="/public/icons.svg#icon-close" />
              ) : (
                <use href="/public/icons.svg#icon-filter" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`${css.filtersContent} ${
            isFilterOpen ? css.open : css.hidden
          }`}
        >
          <div className={css.selectContainer}>
            <Select
              components={animatedComponents}
              options={categoriesOptions}
              value={selectedCategory}
              onChange={onCategoryChange}
              placeholder="Category"
              isClearable
            />
          </div>

          <div className={css.selectContainer}>
            <Select
              components={animatedComponents}
              options={ingredientsOptions}
              value={selectedIngredients}
              onChange={onIngredientsChange}
              placeholder="Ingredient"
              isMulti
            />
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className={css.resetButton}
          >
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
