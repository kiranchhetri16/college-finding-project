import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import UserLayout from "../../../components/user/UserLayout";

type College = { id: number; college_name: string };

const AppointmentForm = () => {
  const initialData = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    college: "",
    date: "",
    time: "",
    best_method: "",
    best_time: "",
    message: "",
    notes: "",
    file: null as File | null,
    timezone: "Nepal Standard Time (UTC+5:45)",
  };

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);

  // --- Timeslots (match screenshot style) ---
  const timeSlots = useMemo(
    () => ["9:00 AM", "10:00 AM", "3:00 PM", "1:00 PM", "2:00 PM", "4:00 PM"],
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/colleges")
      .then((res) => setColleges(res.data))
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
    const { name, value, files, type } = e.target as HTMLInputElement;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, file: files?.[0] ?? null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectTime = (slot: string) => {
    setFormData((prev) => ({ ...prev, time: slot }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date) return alert("Please select appointment date");
    if (!formData.time) return alert("Please select appointment time");

    const form = new FormData();
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("phone", formData.phone);
    form.append("email", formData.email);

    form.append("college_id", formData.college);
    form.append("date", formData.date);
    form.append("time", formData.time);
    form.append("timezone", formData.timezone);

    form.append("best_method", formData.best_method);
    form.append("best_time", formData.best_time);

    form.append("message", formData.message);
    form.append("notes", formData.notes);

    if (formData.file) form.append("file", formData.file);

    try {
      const res = await axios.post("http://localhost:5000/api/appointments", form);

      if (res.status === 200) {
        alert("Appointment booked successfully!");
        setFormData(initialData);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const todayMin = new Date().toISOString().split("T")[0];

  return (
    <UserLayout>
      <div className="w-full py-12 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white border border-gray-200 shadow-sm"
        >
          {/* Top Title */}
          <div className="px-6 pt-6 text-center">
            <h1 className="text-2xl font-extrabold text-gray-900">
              Appointment Form
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              To schedule an appointment, please fill out the information below.
            </p>
            <div className="mt-4 border-t border-gray-200" />
          </div>

          {error && <div className="px-6 mt-4 text-red-500">{error}</div>}

          {/* Appointment Details */}
          <div className="px-6 py-6">
            <h2 className="text-lg font-bold text-gray-900">Appointment Details</h2>
            <div className="mt-3 border-t border-gray-200" />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment
                </label>

                <div className="border border-gray-300 rounded-md p-3">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => {
                      handleChange(e);
                      // reset time when date changes (optional)
                      setFormData((prev) => ({ ...prev, time: "" }));
                    }}
                    min={todayMin}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  {/* College select (keep existing but place nicely) */}
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      College
                    </label>
                    <select
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select college</option>
                      {colleges.map((college) => (
                        <option key={college.id} value={college.id}>
                          {college.college_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right: Times */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">
                    {formData.date
                      ? new Date(formData.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => {
                    const active = formData.time === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => handleSelectTime(slot)}
                        className={[
                          "border rounded-md py-2 text-sm font-semibold transition",
                          active
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-blue-600 text-blue-700 hover:bg-blue-50",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className="text-xs text-gray-600">Europe/Kathmandu (UTC+5:45)</span>
                </div>

                <div className="mt-3">
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Nepal Standard Time (UTC+5:45)">
                      Nepal Standard Time (UTC+5:45)
                    </option>
                    <option value="India Standard Time (UTC+5:30)">
                      India Standard Time (UTC+5:30)
                    </option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 pb-6">
            <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
            <div className="mt-3 border-t border-gray-200" />

            {/* Name */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:pt-6">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="(000) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please enter a valid phone number.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Best method */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Best method for contacting you?
                </label>
                <select
                  name="best_method"
                  value={formData.best_method}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Please Select</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              {/* Best time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Best time of day to reach you?
                </label>
                <select
                  name="best_time"
                  value={formData.best_time}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Please Select</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
            </div>

            {/* File upload */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Attach file (optional)
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Textareas */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                How can we help you?
              </label>
              <textarea
                name="message"
                placeholder="Type here..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Additional notes:
              </label>
              <textarea
                name="notes"
                placeholder="Type here..."
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="px-10 py-2.5 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default AppointmentForm;
