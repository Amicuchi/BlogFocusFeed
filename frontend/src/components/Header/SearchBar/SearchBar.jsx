import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Pesquisar"
                aria-label="Campo de busca"
            />
            <button
                className={styles.searchInputBtn}
                type="button"
            >
                🔍
            </button>
        </div>
    );
}

export default SearchBar;