import { useNavigate } from 'react-router-dom';
import collegeImg from '../assets/images/bg.jpg';

const CollegeCard = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/collegedetail'); // use actual ID or slug
  };

  return (
    <div className='flex justify-center gap-10'>
      <div className="w-80 rounded-2xl shadow-md overflow-hidden">
        <div className="relative h-48">
          <img
            src={collegeImg}
            alt="Stanford University"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-white text-black text-xs px-3 py-1 rounded-full shadow-md">
            Stanford, CA
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Stanford University</h2>
            <button
              onClick={handleViewDetails}
              className="bg-blue-600 text-white text-xs px-4 py-1 rounded hover:bg-blue-700 cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
