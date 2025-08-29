import { useSelector } from "react-redux";

export default function SearchResultsList() {
  const { results, isLoading, error } = useSelector(state => state.searchResults);

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (results.length === 0) return <p>Nothing found</p>;

  return (
    <ul>
      {results.map(recipe => (
        <li key={recipe._id}>{recipe.title}</li>
      ))}
    </ul>
  );
}
