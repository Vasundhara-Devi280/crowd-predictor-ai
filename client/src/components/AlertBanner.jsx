function AlertBanner({ reports }) {
  const highCrowd = reports.filter(
    (r) => r.crowdLevel === "High"
  ).length;

  if (highCrowd < 3) {
    return null;
  }

  return (
    <div
      className="
        bg-red-600
        text-white
        p-4
        rounded-2xl
        mb-8
        text-center
        text-xl
        font-bold
      "
    >
      Heavy Crowd Detected In Multiple Areas
    </div>
  );
}

export default AlertBanner;