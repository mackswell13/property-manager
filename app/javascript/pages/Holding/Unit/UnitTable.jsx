import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import UnitCreateForm from "./UnitCreateForm";
import UnitEditRow from "./UnitEditRow";

export default function UnitTable({ units, holdingId }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editId, setEditId] = useState(null);

    // Format currency function
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleFormSuccess = () => {
        setShowAddForm(false);
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Units</h3>
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                    >
                        Add Unit
                    </button>
                )}
            </div>

            {showAddForm && (
                <UnitCreateForm
                    holdingId={holdingId}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {(!units || units.length === 0) && !showAddForm ? (
                <div className="bg-gray-50 p-6 rounded-md border border-gray-200 text-center">
                    <p className="text-gray-500">
                        No units available for this property.
                    </p>
                </div>
            ) : (
                units &&
                units.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Size
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Bedrooms
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Bathrooms
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Rental Rate
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {units.map((unit) => {
                                    if (unit.id == editId) {
                                        return (
                                            <UnitEditRow
                                                key={unit.id}
                                                unit={unit}
                                                holdingId={holdingId}
                                                onSuccess={() =>
                                                    setEditId(null)
                                                }
                                                onCancel={() => setEditId(null)}
                                            />
                                        );
                                    } else {
                                        return (
                                            <tr
                                                key={unit.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="py-3 px-4 text-sm text-gray-900">
                                                    {unit.name}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {unit.square_footage} sq ft
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {unit.bedroom_count}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {unit.bathroom_count}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {formatCurrency(
                                                        unit.rental_rate
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {unit.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm space-x-2 whitespace-nowrap">
                                                    <p
                                                        onClick={() =>
                                                            setEditId(unit.id)
                                                        }
                                                        className="text-yellow-600 hover:text-yellow-800 underline cursor-pointer"
                                                    >
                                                        Edit
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
}
