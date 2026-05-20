import { useState } from "react";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration successful");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >
      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-md
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-center
            mb-6
          "
        >
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="
              w-full
              p-3
              border
              rounded-xl
              mb-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="
              w-full
              p-3
              border
              rounded-xl
              mb-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="
              w-full
              p-3
              border
              rounded-xl
              mb-6
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;