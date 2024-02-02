import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Logo from "./Logo";
import style from "./Sidebar.module.css";
import AppNav from "./AppNav";
const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SideBar;
