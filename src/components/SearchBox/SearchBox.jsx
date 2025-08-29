import { useState } from "react";
import styles from "./SearchBox.module.css";
import toast from "react-hot-toast";


export default function SearchBox({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a recipe name!");
      return;
    }

    onSearch(searchQuery.trim());

  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}