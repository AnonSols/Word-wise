import SideBar from "../components/SideBar";
import style from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={style.app}>
      <SideBar />
      <div>map </div>
    </div>
  );
};

export default AppLayout;
