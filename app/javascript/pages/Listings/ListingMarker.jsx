import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function ListingMarker({ holding, isActive }) {
    const markerRef = useRef(null);
    const [units, setUnits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const marker = markerRef.current;
        if (marker) {
            isActive ? marker.openPopup() : marker.closePopup();
        }
    }, [isActive]);

    const fetchAvailableUnits = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/listings/${holding.id}/fetch_available_units?holding_id=${holding.id}`);
            if (!response.ok) throw new Error("Failed to fetch units");
            
            const data = await response.json();
            setUnits(data.units || []);
        } catch (error) {
            console.error("Error fetching units:", error);
            setUnits([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Marker
            position={[holding.lat, holding.lng]}
            key={holding.id}
            ref={markerRef}
            eventHandlers={{
                popupopen: fetchAvailableUnits
            }}
        >
            <Popup minWidth={200} closeButton={false}>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold">
                        <Link href={`/listings/${holding.id}`}>
                            {holding.name}
                        </Link>
                    </h3>
                    <p>
                        Lat: {holding.lat}, Lng: {holding.lng}
                    </p>

                    {isLoading ? (
                        <p className="text-sm italic">Loading units...</p>
                    ) : (
                        <div className="mt-2">
                            <p className="font-semibold">Available Units:</p>
                            {units.length > 0 ? (
                                <ul className="text-sm mt-1">
                                    {units.map((unit, idx) => (
                                        <li key={idx}>
                                            {unit.name} – ${unit.rental_rate}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm">No units available</p>
                            )}
                        </div>
                    )}
                </div>
            </Popup>
        </Marker>
    );
}

