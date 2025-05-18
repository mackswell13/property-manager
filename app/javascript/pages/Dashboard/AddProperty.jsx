import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AddProperty() {
  const { data, setData, post, processing, reset } = useForm({
    lat: 0,
    lng: 0,
    name: "",
  });

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    post("/holdings", {
      onSuccess: () => reset(),
    });
  }

  function handleAddressLookup(e) {
    e.preventDefault();
    if (!addressInput.trim()) {
      setSearchError("Please enter an address");
      return;
    }

    setIsSearching(true);
    setSearchError("");

    const encodedAddress = encodeURIComponent(addressInput.trim());
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

    fetch(nominatimUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "PropertyApp/1.0",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const result = data[0];

          setData({
            ...data,
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            name: result.display_name,
          });

          setShowAddressModal(false);
        } else {
          setSearchError(
            "No results found for this address. Please try a different search."
          );
        }
      })
      .catch((error) => {
        console.error("Error looking up address:", error);
        setSearchError("Error looking up address. Please try again.");
      })
      .finally(() => {
        setIsSearching(false);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-end gap-6 p-4 bg-white justify-center relative"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={data.lat}
            onChange={(e) => setData("lat", e.target.value)}
            className="mt-1 block w-36 border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={data.lng}
            onChange={(e) => setData("lng", e.target.value)}
            className="mt-1 block w-36 border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className="mt-1 block w-44 border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 cursor-pointer disabled:opacity-75"
          >
            Add Property
          </button>
          <button
            type="button"
            onClick={() => setShowAddressModal(true)}
            className="ml-2 text-blue-600 hover:text-blue-800 w-8 h-8 rounded-full flex items-center justify-center"
            title="Look up address to get coordinates"
          >
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="w-full h-full cursor-pointer"
            />
          </button>
        </div>
      </form>

      {showAddressModal && (
        <div className="fixed inset-0 bg-none bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Look Up Address
            </h3>

            <form onSubmit={handleAddressLookup}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Address
                </label>
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="123 Main St, City, State, ZIP"
                  className="w-full border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {searchError && (
                  <p className="mt-1 text-sm text-red-600">{searchError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-75"
                >
                  {isSearching ? "Searching..." : "Look Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
