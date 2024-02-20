import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCity } from "../context/CityContext";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button/Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCity();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const { lat, lng } = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);
  return (
    <div className={style.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onclick={getPosition}>
          {isLoadingPosition ? "Loading" : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={style.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map((city, id) => (
            <>
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={id}
              >
                <Popup>
                  <span>{city.emoji}</span>
                  <span>{city.country}</span>
                </Popup>
              </Marker>
            </>
          ))}
        <ChangCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangCenter({ position }: { position: [number, number] }): null {
  const map = useMap();

  map.setView(position);
  return null;
}

function DetectClick(): null {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      return navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
