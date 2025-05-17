import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import AddProperty from "./AddProperty";
import PropertyTable from "./PropertyTable";

export default function Page({ home, holdings }) {
    const [lat, setLat] = useState(home.lat ?? 39.8283);
    const [lng, setLng] = useState(home.lng ?? -98.5795);

    console.log("home", home);
    console.log("holdings", holdings);

    return (
        <main className="container mx-auto h-screen pt-6">
            <h1 className="text-center font-bold text-4xl mb-6">Property Manager</h1>

            <div className="h-[60%]">
                <MapContainer
                    className="h-full w-[80%] mx-auto"
                    zoom={4}
                    center={[lat, lng]}
                    scrollWheelZoom={false}
                    key={`${lat}-${lng}`} // Forces map to re-center on change
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {home.lat && home.lng &&
                        <Marker position={[home.lat, home.lng]}>
                            <Popup>
                                Current Position <br />
                                Lat: {home.lat}, Lng: {home.lng}
                            </Popup>
                        </Marker>
                    }
                    {holdings.map((holding) => (
                        <Marker position={[holding.lat, holding.lng]}>
                            <Popup>
                                {holding.name}<br />
                                Lat: {holding.lat}, Lng: {holding.lng}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <AddProperty />
            <PropertyTable holdings={holdings} />
        </main>
    );
}

