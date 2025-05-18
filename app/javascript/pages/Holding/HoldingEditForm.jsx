import { useForm } from "@inertiajs/react";

export default function HoldingEditForm({ holding, onClose }) {
  const { data, setData, put, processing, reset, errors } = useForm({
    id: holding.id,
    lat: holding.lat,
    lng: holding.lng,
    name: holding.name,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    put(`/holdings/${holding.id}`, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <label className="block text-xs font-medium text-gray-700">Name</label>
        <textarea
          value={data.name}
          onChange={(e) => {
            e.stopPropagation();
            setData("name", e.target.value);
          }}
          className="mt-1 block w-full text-sm border border-gray-300 rounded p-1 resize-y"
          rows={3}
          onClick={(e) => e.stopPropagation()}
        />
        {errors.name && (
          <div className="text-red-500 text-xs">{errors.name}</div>
        )}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">
          Latitude
        </label>
        <input
          type="number"
          step="any"
          value={data.lat}
          onChange={(e) => {
            e.stopPropagation();
            setData("lat", e.target.value);
          }}
          className="mt-1 block w-full text-sm border border-gray-300 rounded p-1"
          onClick={(e) => e.stopPropagation()}
        />
        {errors.lat && <div className="text-red-500 text-xs">{errors.lat}</div>}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">
          Longitude
        </label>
        <input
          type="number"
          step="any"
          value={data.lng}
          onChange={(e) => {
            e.stopPropagation();
            setData("lng", e.target.value);
          }}
          className="mt-1 block w-full text-sm border border-gray-300 rounded p-1"
          onClick={(e) => e.stopPropagation()}
        />
        {errors.lng && <div className="text-red-500 text-xs">{errors.lng}</div>}
      </div>
      <div className="flex justify-between gap-2 mt-2">
        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={processing}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-75"
          onClick={(e) => e.stopPropagation()}
        >
          Save
        </button>
      </div>
    </form>
  );
}
