import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/adminlayout/AdminLayout";

interface User {
  id: number;
  fullname: string;
  email: string;
  address: string | null;
  phone: string | null;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get<User[]>("http://localhost:5000/api/users");
      setUsers(res.data);
      console.log(setUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setEditUserId(user.id);
    setEditFormData(user);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
    setEditFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    if (!editUserId) return;

    try {
      // Validate required fields
      if (!editFormData.fullname || !editFormData.email) {
        alert("Fullname and Email are required.");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/users/${editUserId}`,
        editFormData
      );
      alert("User updated successfully");
      setEditUserId(null);
      setEditFormData({});
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update user.");
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="w-full h-full bg-gray-200 py-6">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="even:bg-gray-50">
                  {editUserId === user.id ? (
                    <>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="fullname"
                          value={editFormData.fullname || ""}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email || ""}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="address"
                          value={editFormData.address || ""}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="phone"
                          value={editFormData.phone || ""}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2 space-x-2">
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2">{user.fullname}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.address}</td>
                      <td className="border px-4 py-2">{user.phone}</td>
                      <td className="border px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
