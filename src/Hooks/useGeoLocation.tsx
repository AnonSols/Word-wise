import { useState } from "react";

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

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

  return { isLoading, error, position };
}
