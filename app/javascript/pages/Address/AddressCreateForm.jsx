import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function AddressCreateForm({
  holdingId,
  address = null,
  onSuccess,
  onCancel,
}) {
  const form = useForm({
    street_address: "",
    unit: "",
    city: "",
    state: "",
    postal_code: "",
    country: "United States",
    is_primary: true,
    addressable_type: "Holding",
    addressable_id: holdingId,
  });

  useEffect(() => {
    if (address) {
      form.setData({
        street_address: address.street_address || "",
        unit: address.unit || "",
        city: address.city || "",
        state: address.state || "",
        postal_code: address.postal_code || "",
        country: address.country || "United States",
        is_primary: address.is_primary ?? true,
        addressable_type: "Holding",
        addressable_id: holdingId,
      });
    }
  }, [address, holdingId]);

  function handleSubmit(e) {
    e.preventDefault();

    if (address && address.id) {
      form.put(`/holdings/${holdingId}/address/${address.id}`, {
        onSuccess: () => {
          form.reset();
          if (onSuccess) onSuccess();
        },
      });
    } else {
      form.post(`/holdings/${holdingId}/address`, {
        onSuccess: () => {
          form.reset();
          if (onSuccess) onSuccess();
        },
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm max-w-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {address ? "Edit Address" : "Add Address"}
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="street_address">
          Street Address
        </label>
        <input
          id="street_address"
          type="text"
          value={form.data.street_address}
          onChange={(e) => form.setData("street_address", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {form.errors.street_address && (
          <p className="text-red-600 mt-1">{form.errors.street_address}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="unit">
          Unit
        </label>
        <input
          id="unit"
          type="text"
          value={form.data.unit}
          onChange={(e) => form.setData("unit", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            value={form.data.city}
            onChange={(e) => form.setData("city", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {form.errors.city && (
            <p className="text-red-600 mt-1">{form.errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="state">
            State
          </label>
          <input
            id="state"
            type="text"
            value={form.data.state}
            onChange={(e) => form.setData("state", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {form.errors.state && (
            <p className="text-red-600 mt-1">{form.errors.state}</p>
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="postal_code">
            Postal Code
          </label>
          <input
            id="postal_code"
            type="text"
            value={form.data.postal_code}
            onChange={(e) => form.setData("postal_code", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {form.errors.postal_code && (
            <p className="text-red-600 mt-1">{form.errors.postal_code}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="country">
            Country
          </label>
          <input
            id="country"
            type="text"
            value={form.data.country}
            onChange={(e) => form.setData("country", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {form.errors.country && (
            <p className="text-red-600 mt-1">{form.errors.country}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={form.processing}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Save Address
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-red-500 hover:bg-red-600 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition ml-5"
      >
        Cancel
      </button>
    </form>
  );
}
