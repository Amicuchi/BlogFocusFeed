import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
    return (
        <nav className={styles.menu}>
            <h3>Menu</h3>
            <ul>
                <li>
                    <Link to="/about">Sobre Nós</Link>
                </li>
                <li>
                    <Link to="/contact">Fale Conosco</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;