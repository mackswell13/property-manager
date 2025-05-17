import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import AddressCreateForm from "../Address/AddressCreateForm";

export default function HoldingShow({ holding, address }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!holding) {
    return (
      <div className="p-6 bg-white shadow-md rounded-xl">
        <p className="text-gray-600">No holding selected.</p>
      </div>
    );
  }

  function onFormSuccess() {
    setShowAddressForm(false);
    setIsEditing(false);
  }

  return (
    <div className="mt-6 p-6 bg-white shadow-md rounded-xl container mx-auto">
      <Link href="/" className="mb-4 text-sm text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">{holding.name}</h2>

      <div className="space-y-2 text-gray-700 mb-6">
        <div>
          <span className="font-semibold">Latitude:</span>{" "}
          {Number(holding.lat).toFixed(6)}
        </div>
        <div>
          <span className="font-semibold">Longitude:</span>{" "}
          {Number(holding.lng).toFixed(6)}
        </div>

        {address ? (
          <>
            {!isEditing ? (
              <div className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300">
                <h3 className="font-semibold mb-2 text-gray-800">Address</h3>
                <p>{address.street_address}</p>
                {address.city && (
                  <p>
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                )}
                {address.country && <p>{address.country}</p>}

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  Edit Address
                </button>
              </div>
            ) : (
              <AddressCreateForm
                holdingId={holding.id}
                address={address}
                onSuccess={onFormSuccess}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </>
        ) : (
          <>
            {!showAddressForm && (
              <button
                onClick={() => setShowAddressForm(true)}
                className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
              >
                Add Address
              </button>
            )}

            {showAddressForm && (
              <AddressCreateForm
                holdingId={holding.id}
                onSuccess={onFormSuccess}
                onCancel={() => setShowAddressForm(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
