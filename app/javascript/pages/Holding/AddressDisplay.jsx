import React, { useState } from "react";
import AddressCreateForm from "../Address/AddressCreateForm";

export default function AddressDisplay({ address, holdingId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  function onFormSuccess() {
    setShowAddressForm(false);
    setIsEditing(false);
  }

  if (address) {
    return (
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
            holdingId={holdingId}
            address={address}
            onSuccess={onFormSuccess}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </>
    );
  } else {
    return (
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
            holdingId={holdingId}
            onSuccess={onFormSuccess}
            onCancel={() => setShowAddressForm(false)}
          />
        )}
      </>
    );
  }
}
