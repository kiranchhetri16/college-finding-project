import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import AdminLayout from "../../components/adminlayout/AdminLayout";

const AddProgram = () => {
  const [formData, setFormData] = useState({
    college_name: "",
    faculty: "",
    city: "",
    country: "",
    course: "",
    description: "",
    type: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add program");
      } else {
        setMessage("Program added successfully!");
        setFormData({
          college_name: "",
          faculty: "",
          city: "",
          country: "",
          course: "",
          description: "",
          type: "",
        });
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="w-full h-full bg-gray-200 py-6 ">
      <div className="w-[1000px] mx-auto p-6  bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Add New Program</h2>

        {message && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            College Name
            <input
              type="text"
              name="college_name"
              value={formData.college_name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded"
              placeholder="Enter college name"
            />
          </label>

          <label className="flex flex-col">
            Faculty
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded"
              placeholder="Enter faculty"
            />
          </label>

          <label className="flex flex-col">
            City
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded"
              placeholder="Enter city"
            />
          </label>

          <label className="flex flex-col">
            Country
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded"
              placeholder="Enter country"
            />
          </label>
          <label className="flex flex-col">
            Course Module
            <input
              type="number"
              name="course"
              min="1"
              value={formData.course}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded"
              placeholder="Enter course duration"
            />
          </label>

          <label className="flex flex-col">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded"
              placeholder="Enter description"
            />
          </label>

          <label className="flex flex-col">
            Organization Type
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 rounded hover:bg-accent transition"
          >
            Add Program
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProgram;
