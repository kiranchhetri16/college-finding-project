import React from "react";
import UserLayout from "../../../components/user/UserLayout";
import ill from "../../../assets/images/illustration.avif";
import { FaStar } from "react-icons/fa";
import { University2Logo, UniversityLogo } from "../../../assets/images/index";

const Dashboard = () => {
  const Icon = [
    {
      id: 1,
      name: University2Logo,
    },
    { id: 2, name: UniversityLogo },
  ];
  return (
    <UserLayout>
      <section className="px-6 py-12 md:px-12 bg-white text-gray-800 flex justify-center gap-[90px] m-auto">
        {/* Top Text */}
        <div className="max-w-[600px]  text-center md:text-left">
          <p className="text-sm font-bold text-purple-700 mb-2">MEET FIND ME</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
            Your online study-abroad advisor
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold">Studying abroad made easier:</span>{" "}
            We guide you at every stage, showing you what you need to do, when
            to do it, and how.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold">
              Free study abroad roadmap
            </button>
            <button className="border border-purple-600 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-md font-semibold">
              Find programs
            </button>
          </div>

          {/* Trust + Rating */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Trusted by 37,000+ students
              </p>
              <div className="flex space-x-[-10px]">
                {[
                  "/bg.jpg",
                  "/face2.jpg",
                  "/face3.jpg",
                  "/face4.jpg",
                  "/face5.jpg",
                ].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`face-${index}`}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Highly rated
              </p>
              <div className="flex items-center space-x-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                <img src="/feefo-logo.png" alt="Feefo" className="h-5" />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                4.6/5 based on 88 reviews
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-8 w-[500px]  ">
          <img src={ill} alt="Hero illustration" className="w-[100%] h-auto" />
        </div>
      </section>
      <div className="w-full py-[24px] flex flex-col gap-6 justify-center items-center  bg-gray-300">
        <h2 className="text-2xl leading-7 ">
          Compare 400+ top universities worldwide
        </h2>
        <div className="flex gap-6 justify-center">
          {Icon.map((item, index) => (
            <div key={index} className="h-[50px] w-[147px]">
              <img src={item.name} alt="icon" className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
