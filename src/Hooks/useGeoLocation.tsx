import { useState } from "react";

type positionProp = { lat: number; lng: number };
export function useGeolocation(defaultPostion: null | positionProp = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState<positionProp | null>(defaultPostion);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Geolocation is not enabled for your browser");
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });

        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}
