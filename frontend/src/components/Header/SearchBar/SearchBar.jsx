import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Proptypes from "prop-types";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/posts?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Pesquisar"
        aria-label="Campo de busca"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Redireciona ao pressionar Enter
      />
      <button
        className={styles.searchInputBtn}
        type="button"
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  onSearchResults: Proptypes.func.isRequired,
};

export default SearchBar;
