import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import AddProperty from "./AddProperty";

export default function Page({home}) {
  const [lat, setLat] = useState(home.lat);
  const [lng, setLng] = useState(home.lng);

  return (
    <main className="container mx-auto">
      <h1 className="text-center my-6 font-bold text-4xl">Property Manager</h1>

      <div className="h-[800px]">
        <MapContainer
          className="h-full w-[80%] mx-auto"
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          key={`${lat}-${lng}`} // Forces map to re-center on change
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              Current Position <br />
              Lat: {lat}, Lng: {lng}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <AddProperty />
    </main>
  );
}

