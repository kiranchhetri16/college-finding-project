import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserLayout from "../components/user/UserLayout";

interface Program {
  id: number;
  college_name: string;
  faculty: string;
  city: string;
  country: string;
  description: string;
  type: string;
}

const CollegeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/programs/${id}`)
        .then((res) => {
          setProgram(res.data);
        })
        .catch((err) => {
          console.error("Error fetching program details:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!program) {
    return (
      <div className="text-center mt-10 text-red-500">College not found.</div>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold mb-4">{program.college_name}</h1>
        <p className="text-sm text-gray-600 mb-2">
          {program.city}, {program.country}
        </p>
        <p className="text-sm text-gray-500 mb-4">{program.type}</p>
        <h2 className="text-md font-semibold mb-2">{program.faculty}</h2>
        <p className="text-base text-gray-700">{program.description}</p>
      </div>
    </UserLayout>
  );
};

export default CollegeDetail;
