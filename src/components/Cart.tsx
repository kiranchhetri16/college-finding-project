import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import collegeImg from "../assets/images/bg.jpg";
import UserLayout from "./user/UserLayout";

const CollegeCard = () => {
  const navigate = useNavigate();
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    // Fetch college programs from backend
    axios
      .get("http://localhost:5000/api/programs")
      .then((res) => {
        setCollegeData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching college programs:", err);
      });
  }, []);

  return (
    <UserLayout>
      <div className="flex flex-wrap justify-center gap-10">
        {collegeData.map((college) => (
          <div
            key={college.id}
            className="w-80 rounded-2xl shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={collegeImg} // You can change this if image URL comes from backend
                alt={college.college_name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 left-2 bg-white text-black text-xs px-3 py-1 rounded-full shadow-md">
                {college.city}, {college.country}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">
                  {college.college_name}
                </h2>
                <button
                  onClick={() => navigate(`/college/${college.id}`)}
                  className="bg-blue-600 text-white text-xs px-4 py-1 rounded hover:bg-blue-700 cursor-pointer"
                >
                  View Details
                </button>
              </div>
              <p className="text-sm text-gray-600">{college.faculty}</p>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default CollegeCard;
