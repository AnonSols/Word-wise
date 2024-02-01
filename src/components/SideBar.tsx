import Footer from "./Footer";
import style from "./Sidebar.module.css";
const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <div>sidebar</div>
      <Footer />
    </div>
  );
};

export default SideBar;
