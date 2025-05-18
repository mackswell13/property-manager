import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
    useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import HoldingMarker from "../Holding/HoldingMarker";
import PropertyTable from "../Dashboard/PropertyTable";
import ListingMarker from "./ListingMarker";

const MapClickHandler = ({ onMapClick }) => {
    useMapEvent("click", () => {
        onMapClick(); // call your handler to clear active marker
    });
};

export default function Page({ holdings }) {
    // center us
    const [lat, setLat] = useState(39.8283);
    const [lng, setLng] = useState(-98.5795);
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
                    {holdings.map((holding) => (
                        <ListingMarker
                            key={holding.id}
                            holding={holding}
                            isActive={activeHolding === holding.id}
                        />
                    ))}
                </MapContainer>
            </div>
            <PropertyTable
                holdings={holdings}
                handleClick={handlePropertyTableClick}
            />
        </main>
    );
}
