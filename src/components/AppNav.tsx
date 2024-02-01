import { Link } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo";
const AppNav = () => {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/login" className={style.ctaLink}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
