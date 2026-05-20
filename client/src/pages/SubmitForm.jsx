import { useEffect, useState } from "react";
import API from "../services/api";

function SubmitForm() {
  const [formData, setFormData] = useState({
    location: "",
    transportType: "",
    crowdLevel: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude:
            position.coords.latitude,
          longitude:
            position.coords.longitude,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/crowd",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Crowd report submitted");
    } catch (error) {
      console.log(error);

      alert("Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Submit Crowd Report
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl mb-4"
          />

          <input
            type="text"
            name="transportType"
            placeholder="Transport Type"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl mb-4"
          />

          <select
            name="crowdLevel"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl mb-6"
          >
            <option value="">
              Select Crowd Level
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitForm;