import { useNavigate, useSearchParams } from "react-router-dom";
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

const Map = () => {
  const { cities } = useCity();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const [searchParams] = useSearchParams();

  const mapLat = Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);
  return (
    <div className={style.mapContainer}>
      <Button type="position" onclick={getPosition}>
        {isLoadingPosition ? "Loading" : "Use your position"}
      </Button>
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
          cities.map((city) => (
            <>
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={city.id}
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
    click: (e) => navigate(`form?lat=${e.latlng.lat}lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;
