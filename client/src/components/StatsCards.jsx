function StatsCards({ reports }) {
  const totalReports = reports.length;

  const highCrowd = reports.filter(
    (r) => r.crowdLevel === "High"
  ).length;

  const mediumCrowd = reports.filter(
    (r) => r.crowdLevel === "Medium"
  ).length;

  const lowCrowd = reports.filter(
    (r) => r.crowdLevel === "Low"
  ).length;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold">
          Total Reports
        </h2>

        <p className="text-3xl mt-4">
          {totalReports}
        </p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold">
          High Crowd
        </h2>

        <p className="text-3xl mt-4">
          {highCrowd}
        </p>
      </div>

      <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold">
          Medium Crowd
        </h2>

        <p className="text-3xl mt-4">
          {mediumCrowd}
        </p>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold">
          Low Crowd
        </h2>

        <p className="text-3xl mt-4">
          {lowCrowd}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;