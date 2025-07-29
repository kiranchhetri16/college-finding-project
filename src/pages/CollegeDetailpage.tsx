import { useParams } from 'react-router-dom';

const CollegeDetail = () => {
  const { id } = useParams();

  // Simulated college data based on the ID
  const collegeData = {
    stanford: {
      name: 'Stanford University',
      location: 'Stanford, CA',
      type: 'Private 4 Year',
      description:
        'Stanford University is a prestigious private research university known for its academic strength, wealth, and proximity to Silicon Valley.',
    },
  };

  const college = collegeData[id as keyof typeof collegeData];

  if (!college) {
    return <div className="text-center mt-10 text-red-500">College not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-2xl border border-gray-100">
      <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
      <p className="text-sm text-gray-600 mb-2">{college.location}</p>
      <p className="text-sm text-gray-500 mb-4">{college.type}</p>
      <p className="text-base text-gray-700">{college.description}</p>
    </div>
  );
};

export default CollegeDetail;
