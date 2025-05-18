import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function ListingMarker({ holding, isActive }) {
    const markerRef = useRef(null);

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

    return (
        <Marker
            position={[holding.lat, holding.lng]}
            key={holding.id}
            ref={markerRef}
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
                </div>
            </Popup>
        </Marker>
    );
}
