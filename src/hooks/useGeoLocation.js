import { useState } from "react";

function useGeoLocation(defaultValue = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(defaultValue);
  function getPosition(params) {
    if (!navigator.geolocation)
      setError("Your browser doesn't support geolocation!");
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

export default useGeoLocation;
