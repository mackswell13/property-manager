import { Marker, Popup } from "react-leaflet";
import { useState, useRef } from "react";
import HoldingEditForm from "./HoldingEditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function HoldingMarker({ holding }) {
    const [isEditing, setIsEditing] = useState(false);
    const markerRef = useRef(null);

    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
    };

    return (
        <Marker position={[holding.lat, holding.lng]} key={holding.id} ref={markerRef}>
            <Popup minWidth={200} closeButton={false}>
                {!isEditing ? (
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold">{holding.name}</h3>
                        <p>
                            Lat: {holding.lat}, Lng: {holding.lng}
                        </p>
                        <div className="w-full flex items-center gap-2">
                            <button
                                onClick={handleEditClick}
                                className="flex-grow bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button className="flex-shrink-0 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <HoldingEditForm holding={holding} onClose={() => setIsEditing(false)} />
                )}
            </Popup>
        </Marker>
    );
}

