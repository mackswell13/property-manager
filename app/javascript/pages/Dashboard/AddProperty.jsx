import { useState } from "react";
import { router } from "@inertiajs/react";

export default function AddProperty() {
  const [values, setValues] = useState({
    lat: 0,
    lng: 0,
    name: "",
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    router.post("/holdings", values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-6 p-4 bg-white border-b justify-center"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Latitude
        </label>
        <input
          id="lat"
          type="number"
          step="any"
          value={values.lat}
          onChange={handleChange}
          className="mt-1 block w-36 border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Longitude
        </label>
        <input
          id="lng"
          type="number"
          step="any"
          value={values.lng}
          onChange={handleChange}
          className="mt-1 block w-36 border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          className="mt-1 block w-44 border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></input>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Add Property
      </button>
    </form>
  );
}
