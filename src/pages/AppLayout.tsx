import Map from "../components/Map";
import SideBar from "../components/SideBar";
import style from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={style.app}>
      <SideBar />
      <Map />
    </div>
  );
};

export default AppLayout;
