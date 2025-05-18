import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function UnitCreateForm({ holdingId, onSuccess, onCancel }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        square_footage: "",
        bedroom_count: "",
        bathroom_count: "",
        rental_rate: "",
        status: 0,
        holding_id: holdingId,
    });

    const statusOptions = [
        { value: 0, label: "Available" },
        { value: 1, label: "Rented" },
        { value: 2, label: "Application Pending" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        post(`/holdings/${holdingId}/units`, {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
                Add New Unit
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Unit Name/Number*
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            required
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="square_footage"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Square Footage
                        </label>
                        <input
                            type="number"
                            id="square_footage"
                            value={data.square_footage}
                            onChange={(e) =>
                                setData("square_footage", e.target.value)
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {errors.square_footage && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.square_footage}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="bedroom_count"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Bedrooms
                        </label>
                        <input
                            type="number"
                            id="bedroom_count"
                            value={data.bedroom_count}
                            onChange={(e) =>
                                setData("bedroom_count", e.target.value)
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            min="0"
                        />
                        {errors.bedroom_count && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.bedroom_count}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="bathroom_count"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Bathrooms
                        </label>
                        <input
                            type="number"
                            id="bathroom_count"
                            value={data.bathroom_count}
                            onChange={(e) =>
                                setData("bathroom_count", e.target.value)
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            min="0"
                            step="0.5"
                        />
                        {errors.bathroom_count && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.bathroom_count}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="rental_rate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Monthly Rental Rate ($)
                        </label>
                        <input
                            type="number"
                            id="rental_rate"
                            value={data.rental_rate}
                            onChange={(e) =>
                                setData("rental_rate", e.target.value)
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            min="0"
                        />
                        {errors.rental_rate && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.rental_rate}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) =>
                                setData("status", parseInt(e.target.value, 10))
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.status}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                    >
                        {processing ? "Adding..." : "Add Unit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
