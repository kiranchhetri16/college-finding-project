import React, { useState } from "react";
import UserLayout from "../../../components/user/UserLayout";
import { Link } from "react-router-dom";

const FindPrograms = () => {
  const [filters, setFilters] = useState({
    college: "",
    faculty: "",
    city: "",
    country: "",
  });

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResults([]);

    try {
      const query = new URLSearchParams(filters).toString();

      // Make sure to use full backend URL with port
      const res = await fetch(
        `http://localhost:5000/api/search-programs?${query}`
      );

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Failed to fetch programs");
        return;
      }

      const data = await res.json();

      // If your API returns a message for no results, handle it here
      if (data.message) {
        setResults([]);
      } else {
        setResults(data.data);
      }
    } catch (err) {
      setError("Something went wrong while searching.");
      console.error(err);
    }
  };

  return (
    <UserLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Find Programs</h2>
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="college"
            placeholder="College"
            onChange={handleChange}
            value={filters.college}
            className="border p-2 rounded"
          />
          <input
            name="faculty"
            placeholder="Faculty"
            onChange={handleChange}
            value={filters.faculty}
            className="border p-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={filters.city}
            className="border p-2 rounded"
          />
          <input
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={filters.country}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded col-span-1 md:col-span-2"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-6 flex gap-6 ">
          {results.length > 0
            ? results.map((program) => (
                <div
                  key={program.id}
                  className="p-4 border w-[300px] border-red-200 rounded-[12px] flex flex-col gap-4 "
                >
                  {/* Adjust property names if your DB columns differ */}
                  <h3 className="text-lg font-semibold">
                    {program.name || "Program Name"}
                  </h3>
                  <p>
                    {program.college_name} — {program.faculty}
                  </p>
                  <div className="flex justify-between items-center">
                    <p>{program.country}</p>
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps?q=${encodeURIComponent(
                            program.city
                          )}`,
                          "_blank"
                        )
                      }
                      className="border border-red-200 p-2 rounded-[6px]"
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              ))
            : !error && <p className="text-gray-500">No results found.</p>}
        </div>
      </div>
    </UserLayout>
  );
};

export default FindPrograms;
