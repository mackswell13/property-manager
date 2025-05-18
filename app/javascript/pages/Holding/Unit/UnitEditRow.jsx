import React from "react";
import { useForm } from "@inertiajs/react";

export default function UnitEditRow({ unit, holdingId, onSuccess, onCancel }) {
    const { data, setData, put, processing, errors } = useForm({
        name: unit.name || "",
        square_footage: unit.square_footage || "",
        bedroom_count: unit.bedroom_count || "",
        bathroom_count: unit.bathroom_count || "",
        rental_rate: unit.rental_rate || "",
        status: unit.status ?? 0,
    });

    const statusOptions = [
        { value: 0, label: "Available" },
        { value: 1, label: "Rented" },
        { value: 2, label: "Application Pending" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/holdings/${holdingId}/units/${unit.id}`, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <tr className="bg-yellow-50">
            <td className="py-3 px-4 text-sm">
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full rounded-md border-gray-300 text-sm"
                />
            </td>
            <td className="py-3 px-4 text-sm">
                <input
                    type="number"
                    value={data.square_footage}
                    onChange={(e) =>
                        setData("square_footage", e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 text-sm"
                />
            </td>
            <td className="py-3 px-4 text-sm">
                <input
                    type="number"
                    value={data.bedroom_count}
                    onChange={(e) =>
                        setData("bedroom_count", e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 text-sm"
                />
            </td>
            <td className="py-3 px-4 text-sm">
                <input
                    type="number"
                    value={data.bathroom_count}
                    onChange={(e) =>
                        setData("bathroom_count", e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 text-sm"
                />
            </td>
            <td className="py-3 px-4 text-sm">
                <input
                    type="number"
                    value={data.rental_rate}
                    onChange={(e) => setData("rental_rate", e.target.value)}
                    className="w-full rounded-md border-gray-300 text-sm"
                />
            </td>
            <td className="py-3 px-4 text-sm">
                <select
                    value={data.status}
                    onChange={(e) =>
                        setData("status", parseInt(e.target.value, 10))
                    }
                    className="w-full rounded-md border-gray-300 text-sm"
                >
                    {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </td>
            <td className="py-3 px-4 text-sm space-x-2 whitespace-nowrap">
                <button
                    onClick={onCancel}
                    type="button"
                    className="text-gray-600 hover:text-gray-900 underline"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="text-blue-600 hover:text-blue-800 underline disabled:opacity-60"
                >
                    {processing ? "Saving..." : "Save"}
                </button>
            </td>
        </tr>
    );
}

