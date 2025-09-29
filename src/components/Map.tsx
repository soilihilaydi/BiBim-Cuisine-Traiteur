
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet'; // Import Icon

// Fix for default Leaflet icons not appearing
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

// Default icon workaround for Leaflet with Webpack/Next.js
// This ensures the default marker images are correctly referenced
// if they are still needed or if custom icons don't fully replace them.
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
});

interface MapProps {
  position: LatLngExpression;
  popupText: string;
}

const Map = ({ position, popupText }: MapProps) => {
  // Define a custom icon for the food truck
  const foodTruckIcon = new Icon({
    iconUrl: '/foodtruck.png', // Path to your food truck image in the public directory
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={foodTruckIcon}> {/* Use the custom icon */}
        <Popup>
          {popupText}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
