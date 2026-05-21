import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/api";
import StatsCards from "../components/StatsCards";
import AlertBanner from "../components/AlertBanner";

// Connected directly to live backend to prevent localhost connection loops
const socket = io("https://crowd-predictor-ai.onrender.com", {
  transports: ["websocket", "polling"]
});

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();

    socket.on("newCrowdReport", (newReport) => {
      setReports((prev) => [newReport, ...prev]); // 👈 Fixed clean single-line array update
    });

    return () => {
      socket.off("newCrowdReport");
    };
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await API.get("/crowd");
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Crowd Reports Dashboard
      </h1>

      <AlertBanner reports={reports} />

      <StatsCards reports={reports} />

      <input
        type="text"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-2xl border mb-8 outline-none"
      />

      {reports.length === 0 ? (
        <p className="text-center text-xl">
          No crowd reports submitted yet
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports
            .filter((report) =>
              report.location
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((report) => (
              <div
                key={report._id}
                className={`p-6 rounded-2xl shadow-lg text-white ${
                  report.crowdLevel === "High"
                    ? "bg-red-500"
                    : report.crowdLevel === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                <h2 className="text-2xl font-bold mb-4">
                  {report.location}
                </h2>

                <p className="mb-3">
                  <span className="font-semibold">
                    Transport:
                  </span>{" "}
                  {report.transportType}
                </p>

                <p className="mb-3">
                  <span className="font-semibold">
                    Crowd Level:
                  </span>{" "}
                  {report.crowdLevel}
                </p>

                <p className="mb-3">
                  <span className="font-semibold">
                    Report By:
                  </span>{" "}
                  {report.reportedBy?.name}
                </p>

                <p className="text-sm mt-4">
                  {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;