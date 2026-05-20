import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CrowdChart({ reports }) {
  const crowdData = [
    {
      level: "Low",
      count: reports.filter(
        (r) => r.crowdLevel === "Low"
      ).length,
    },
    {
      level: "Medium",
      count: reports.filter(
        (r) => r.crowdLevel === "Medium"
      ).length,
    },
    {
      level: "High",
      count: reports.filter(
        (r) => r.crowdLevel === "High"
      ).length,
    },
  ];

  const highCrowdCount = reports.filter(
    (r) => r.crowdLevel === "High"
  ).length;

  let prediction = "Low Crowd Expected";

  if (highCrowdCount >= 5) {
    prediction =
      "Heavy Crowd Expected Soon";
  } else if (highCrowdCount >= 3) {
    prediction =
      "Moderate Crowd Expected";
  }

  return (
    <>
      <div
        className="
          bg-black
          text-white
          p-6
          rounded-2xl
          shadow-lg
          mb-8
        "
      >
        <h2 className="text-3xl font-bold mb-3">
          Crowd Prediction
        </h2>

        <p className="text-xl">
          {prediction}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Crowd Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={crowdData}>
            <XAxis dataKey="level" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default CrowdChart;