// import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  return (
    <div className={style.mapContainer}>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
