import { NavLink } from "react-router-dom";
import styles from "../pages/styles.module.css";
const NavPage = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {" "}
          <NavLink to="/">Home </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/about">About </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavPage;
