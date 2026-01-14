import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import collegeImg from "../assets/images/bg.jpg";
import UserLayout from "./user/UserLayout";

type Program = {
  id: number;
  college_name: string;
  faculty: string;
  city: string;
  country: string;
  course?: string;
  description?: string;
  type?: string;
};

type SearchResponse = { message?: string; data: Program[] };

const CollegeCard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const apiBase = useMemo(() => "http://localhost:5000", []);

  const [collegeData, setCollegeData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const q = (searchParams.get("q") || "").trim(); // 🔥 from navbar

  const fetchAll = async () => {
    setLoading(true);
    setInfo("");
    try {
      const res = await axios.get<Program[]>(`${apiBase}/api/programs`);
      setCollegeData(res.data);
      if (res.data.length === 0) setInfo("No programs found.");
    } catch (err) {
      console.error(err);
      setInfo("Failed to load programs.");
    } finally {
      setLoading(false);
    }
  };

 const fetchSearch = async (query: string) => {
  setLoading(true);
  setInfo("");
  try {
    const res = await axios.get(`${apiBase}/api/search-programs?q=${encodeURIComponent(query)}`);

    // ✅ support both: array OR {data: array}
    const programs: Program[] = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data?.data)
      ? res.data.data
      : [];

    setCollegeData(programs);

    if (programs.length === 0) {
      setInfo(res.data?.message || "No programs found.");
    }
  } catch (err) {
    console.error(err);
    setInfo("Search failed.");
    setCollegeData([]);
  } finally {
    setLoading(false);
  }
};


  // 🔥 whenever q changes, load search or all
  useEffect(() => {
    if (q) fetchSearch(q);
    else fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <UserLayout>
      <div className="w-full px-4">
        {/* show what user searched */}
        <div className="max-w-6xl mx-auto mb-4">
          {q ? (
            <p className="text-sm text-gray-600">
              Showing results for: <span className="font-semibold">{q}</span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">Showing all programs</p>
          )}

          {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
          {!loading && info && <p className="text-sm text-gray-600 mt-2">{info}</p>}
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collegeData.map((college) => (
            <div
              key={college.id}
              className="rounded-2xl shadow-md overflow-hidden bg-white"
            >
              <div className="relative h-48">
                <img
                  src={collegeImg}
                  alt={college.college_name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-white text-black text-xs px-3 py-1 rounded-full shadow-md">
                  {college.city}, {college.country}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-semibold leading-snug">
                    {college.college_name}
                  </h2>

                  <button
                    type="button"
                    onClick={() => navigate(`/college/${college.id}`)}
                    className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>

                <p className="text-sm text-gray-600">{college.faculty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default CollegeCard;
