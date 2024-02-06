import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div className={style.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>

      <h2>Positon:</h2>
      <p>lat: {searchParams.get("lat")}</p>
      <p>lng: {searchParams.get("lng")}</p>

      <button onClick={() => setSearchParams({ lat: "23", lng: " 500" })}>
        Change Position
      </button>
    </div>
  );
};

export default Map;
