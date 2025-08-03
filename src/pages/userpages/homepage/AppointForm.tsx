import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../../components/user/UserLayout";

const AppointmentForm = () => {
  const initialData = {
    name: "",
    email: "",
    date: "",
    message: "",
    college: "",
    file: null as File | null,
  };

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");
  const [colleges, setColleges] = useState<
    { id: number; college_name: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/colleges")
      .then((res) => {
        setColleges(res.data);
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges.");
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, file: files?.[0] ?? null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("college_id", formData.college);
    form.append("date", formData.date);
    form.append("message", formData.message);

    if (formData.file) {
      form.append("file", formData.file);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointments",
        form
      );
      if (res.status === 200) {
        alert("Appointment booked successfully!");
        setFormData(initialData);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <UserLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-bold">Book an Appointment</h2>

        {error && <div className="text-red-500">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="college"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.college}
          onChange={handleChange}
          required
        >
          <option value="">Select college</option>
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.college_name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="file"
          className="w-full border px-4 py-2 rounded-md"
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
        />

        <textarea
          name="message"
          placeholder="Message (optional)"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </UserLayout>
  );
};

export default AppointmentForm;
