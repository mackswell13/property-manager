import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Page() {
  return (
    <>
      <main className="container mx-auto">
        <h1 className="text-center my-6 font-bold text-4xl">
          Property Manager
        </h1>
        <div className="h-[800px]">
          <MapContainer
            className="h-full w-[80%] mx-auto"
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </main>
    </>
  );
}
