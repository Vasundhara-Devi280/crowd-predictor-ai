import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function CrowdMap({ reports }) {
  return (
    <div className="mb-8">
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={11}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report) => (
          <Marker
            key={report._id}
            position={[
              report.latitude || 18.5204,
              report.longitude || 73.8567,
            ]}
          >
            <Popup>
              <div>
                <h2>
                  {report.location}
                </h2>

                <p>
                  Crowd:{" "}
                  {report.crowdLevel}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CrowdMap;
