import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/ContextProvider";
import { useMap, useMapEvents } from "react-leaflet";
import { useGeolocation } from "./useGeolocation";
import Button from "./Button";
import { latLng } from "leaflet";
import { useUrlPosition } from "./useUrlPosition";

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const { latmap, lngmap } = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(
    function () {
      if (latmap && lngmap) setMapPosition([latmap, lngmap]);
    },
    [latmap, lngmap]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  function MyComponent() {
    const map = useMap();
    map.flyTo(mapPosition, 8);
    return null;
  }

  function FormNavigateComponent() {
    const mapEvents = useMapEvents({
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
    });
    return null;
  }

  return (
    <div className={styles.mapContainer}>
      <Button type="position" navigate={getPosition}>
        {!isLoadingPosition ? "USE YOUR POSITION" : "LOADING..."}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <Marker position={mapPosition}>
          <Popup>
            <span>Aachen</span>
          </Popup>
        </Marker>
        <MyComponent />
        <FormNavigateComponent />
      </MapContainer>
    </div>
  );
}

export default Map;
