import { Link } from "@inertiajs/react";
import React from "react";
import AddressDisplay from "./AddressDisplay";
import UnitTable from "./Unit/UnitTable";

export default function HoldingShow({ holding, address, units }) {
    if (!holding) {
        return (
            <div className="p-6 bg-white shadow-md rounded-xl">
                <p className="text-gray-600">No holding selected.</p>
            </div>
        );
    }

    return (
        <div className="mt-6 p-6 bg-white shadow-md rounded-xl container mx-auto">
            <div className="mb-4">
                <Link href="/" className="text-sm text-blue-600 hover:underline">
                    ← Back to Dashboard
                </Link>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">{holding.name}</h2>

            <div className="space-y-2 text-gray-700 mb-6">
                <div className="flex flew-row gap-6">
                    <div>
                        <span className="font-semibold">Latitude:</span>{" "}
                        {Number(holding.lat).toFixed(6)}
                    </div>
                    <div>
                        <span className="font-semibold">Longitude:</span>{" "}
                        {Number(holding.lng).toFixed(6)}
                    </div>
                </div>

                <AddressDisplay address={address} holdingId={holding.id} />

                <UnitTable units={units} holdingId={holding.id} />
            </div>
        </div>
    );
}
