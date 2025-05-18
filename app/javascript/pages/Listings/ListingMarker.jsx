import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { Link, router } from "@inertiajs/react";

export default function ListingMarker({ holding, isActive }) {
    const markerRef = useRef(null);
    const [units, setUnits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const marker = markerRef.current;
        if (marker) {
            if (isActive) {
                marker.openPopup();
            } else {
                marker.closePopup();
            }
        }
    }, [isActive]);

    const fetchAvailableUnits = () => {
        setIsLoading(true);
        
        // I think I just need to send json and not an inertia or user inertia share
        router.visit(`/listings/${holding.id}/fetch_available_units`, {
            method: "get",
            only: ["units"],
            preserveState: true,
            preserveScroll: true,
            data: {
                holding_id: holding.id
            },
            onSuccess: (page) => {
                setUnits(page.props.units || []);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            },
        });
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
                                    {units.map((unit) => (
                                        <li key={unit.id}>
                                            {unit.name} - ${unit.price}
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
