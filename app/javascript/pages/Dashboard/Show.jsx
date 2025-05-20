import { MapContainer, TileLayer, Popup, Marker, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import AddProperty from "./AddProperty";
import PropertyTable from "./PropertyTable";
import HoldingMarker from "../Holding/HoldingMarker";
import LogoutButton from "../Auth/LogoutButton";

const MapClickHandler = ({ onMapClick }) => {
    useMapEvent("click", () => {
        onMapClick(); // call your handler to clear active marker
    });
};

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet's default icon path
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})


export default function Page({ home, holdings }) {
    const [lat, setLat] = useState(home?.lat ?? 39.8283);
    const [lng, setLng] = useState(home?.lng ?? -98.5795);
    const [activeHolding, setActiveHolding] = useState("");

    const handlePropertyTableClick = (holding) => {
        setLat(holding.lat);
        setLng(holding.lng);
        setActiveHolding(holding.id);
    };

    return (
        <main className="container mx-auto h-screen pt-6">
            <h1 className="text-center font-bold text-4xl mb-6">
                Property Manager
            </h1>
            <div className="h-[60%]">
                <MapContainer
                    className="h-full w-[80%] mx-auto z-0"
                    zoom={4}
                    center={[lat, lng]}
                    scrollWheelZoom={true}
                    key={`${lat}-${lng}`} // Forces map to re-center on change
                >
                    <MapClickHandler onMapClick={() => setActiveHolding("")} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {home?.lat && home?.lng && (
                        <Marker position={[home.lat, home.lng]}>
                            <Popup>
                                Home <br />
                                Lat: {home.lat}, Lng: {home.lng}
                            </Popup>
                        </Marker>
                    )}
                    {holdings.map((holding) => (
                        <HoldingMarker
                            key={holding.id}
                            holding={holding}
                            isActive={activeHolding === holding.id}
                        />
                    ))}
                </MapContainer>
            </div>
            <AddProperty />
            <PropertyTable
                holdings={holdings}
                handleClick={handlePropertyTableClick}
            />
            <div class="my-5">
                <LogoutButton />
            </div>
        </main>
    );
}
