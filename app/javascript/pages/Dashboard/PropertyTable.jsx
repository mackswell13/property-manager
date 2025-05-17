import React from "react";

export default function PropertyTable({ holdings }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Latitude</th>
            <th className="px-4 py-2 text-left border-b">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {holdings && holdings.length > 0 ? (
            holdings.map((holding, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{holding.name}</td>
                <td className="px-4 py-2 border-b">{Number(holding.lat).toFixed(6)}</td>
                <td className="px-4 py-2 border-b">{Number(holding.lng).toFixed(6)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border-b" colSpan="3">
                No properties available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

