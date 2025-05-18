import { Link } from "@inertiajs/react";
import React from "react";

export default function PropertyTable({ holdings, handleClick }) {
    return (
        <div className="p-4 bg-white shadow-md rounded-xl max-w-full overflow-hidden">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Properties
            </h2>
            <div className="w-full overflow-x-auto">
                <table className="w-full table-fixed border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-1/3 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="w-1/4 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Latitude
                            </th>
                            <th className="w-1/4 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Longitude
                            </th>
                            <th className="w-1/6 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {holdings && holdings.length > 0 ? (
                            holdings.map((holding, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-800 whitespace-normal break-words">
                                        <Link href={`/holdings/${holding.id}`}>
                                            {holding.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {Number(holding.lat).toFixed(6)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {Number(holding.lng).toFixed(6)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleClick(holding)}
                                            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                                        >
                                            Locate
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-4 py-4 text-center text-gray-500"
                                >
                                    No properties available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
