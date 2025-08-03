import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/adminlayout/AdminLayout";

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  file: string;
  status: string;
}

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/appointments/${id}/status`,
        {
          status,
        }
      );
      alert(res.data.message);
      fetchAppointments(); // Refresh list after update
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div className="w-full h-full p-4 bg-gray-200">
      <h2 className="text-xl font-bold mb-4">Appointment Requests</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">File</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="border-b">
              <td className="border p-2">{appt.name}</td>
              <td className="border p-2">{appt.email}</td>
              <td className="border p-2">{appt.phone}</td>
              <td className="border p-2">{appt.date}</td>
              <td className="border p-2">{appt.message}</td>
              <td className="border p-2">
                <a
                  href={`http://localhost:5000/uploads/${appt.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View
                </a>
              </td>
              <td className="border p-2">{appt.status || "Pending"}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateStatus(appt.id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => updateStatus(appt.id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
