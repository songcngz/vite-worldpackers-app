import { useEffect, useState } from "react";
import SearchParams from "../hooks/SearchParams";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import Button from "./Button";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Map() {
  const {
    isLoading: isGeoLoading,

    position: geoPosition,
    getPosition,
  } = useGeoLocation();
  const [lat, lng] = SearchParams();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapZoom, setMapZoom] = useState(8);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
      setMapZoom(5);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition) {
      setMapPosition([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isGeoLoading ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={mapZoom}
        scrollWheelZoom={true}
      >
        <ChangeView center={mapPosition} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.emoji && flagemojiToPNG(city.emoji)} {city.cityName}
            </Popup>
          </Marker>
        ))}

        <MapEvents />
      </MapContainer>
    </div>
  );
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
function MapEvents() {
  const navigate = useNavigate();
  useMapEvent("click", (e) => {
    navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });
}

export default Map;
