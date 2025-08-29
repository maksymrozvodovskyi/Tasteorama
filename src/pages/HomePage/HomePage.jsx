import { useState } from "react";
import Hero from "../../components/Hero/Hero.jsx";
import { handleRecipeSearch } from "../../utils/searchHandler";
import { useDispatch, useSelector } from "react-redux";

import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipeList/RecipeList";
import {
  selectFilterCategory,
  selectFilterIngredients,
} from "../../redux/filters/selectors";
import { setTitleFilter } from "../../redux/filters/slice";



export default function HomePage() {
 const dispatch = useDispatch();
  const category = useSelector(selectFilterCategory);
  const ingredients = useSelector(selectFilterIngredients);

  const handleSearch = (query) => {
    dispatch(setTitleFilter(query));
    handleRecipeSearch(query, { category, ingredients }, dispatch);
  };




  return (
    <>
      <Hero onSearch={handleSearch} />
      

      <h1>HomePage</h1>
      <Filters />
      <RecipesList />
    </>
  );
}
