import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { googleMapsConfig } from './api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

type Vineyard = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
};

type VineyardMapProps = {
  vineyards: Vineyard[];
  onMarkerClick: (vineyard: Vineyard) => void;
};

export function VineyardMap({ vineyards, onMarkerClick }: VineyardMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.apiKey,
    libraries: googleMapsConfig.libraries
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const center = {
    lat: 51.9194,
    lng: 19.1451
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={6}
      center={center}
    >
      {vineyards.map((vineyard) => (
        <Marker
          key={vineyard.id}
          position={vineyard.coordinates}
          onClick={() => onMarkerClick(vineyard)}
          icon={{
            url: '/wine-marker.png',
            scaledSize: new window.google.maps.Size(32, 32)
          }}
        />
      ))}
    </GoogleMap>
  );
}
