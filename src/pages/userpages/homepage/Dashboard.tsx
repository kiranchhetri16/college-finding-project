import React from "react";
import UserLayout from "../../../components/user/UserLayout";
import ill from "../../../assets/images/illustration.avif";
import { FaStar } from "react-icons/fa";
import { University2Logo, UniversityLogo } from "../../../assets/images/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AvtarIcon } from "../../../assets/images/index";

const Dashboard = () => {
  const Icon = [
    {
      id: 1,
      name: University2Logo,
    },
    { id: 2, name: UniversityLogo },
  ];
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };
  const faqData = [
    {
      question: "Are there any additional costs beyond the subscription fees?",
      answer:
        "No, Suga's pricing plans include all essential features and support. Additional costs may apply only if you choose optional training, custom development, or premium support packages.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question:
        "Can I switch between pricing plans as my beauty business evolves?",
      answer:
        "Yes, you can switch plans anytime based on your needs. Changes will reflect in your next billing cycle.",
    },
    {
      question: "How can I contact support if I have issues?",
      answer:
        "You can contact us via our support chat, email, or by submitting a ticket through the dashboard.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 14-day free trial for all new users. No credit card required.",
    },
    {
      question: "Are there any additional costs beyond the subscription fees?",
      answer:
        "No, Suga's pricing plans include all essential features and support. Additional costs may apply only if you choose optional training, custom development, or premium support packages.",
    },
  ];
  const company = [
    {
      title: "Company",
      about: "About",
      feature: "Features",
      work: "Works",
      career: "Career",
    },
    {
      title: "Help",
      customer: "Customer Support",
      delivery: "Delivery Details",
      terms: "Terms & Conditions",
      policy: "Privacy Policy",
    },
    {
      title: "Resources",
      free: "Free eBooks",
      development: "Development Tutorial",
      blog: "How to - Blog",
      playlist: "Youtube Playlist",
    },
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
      <section
        className="w-full bg-[#F0F0F0] md:py-[64px] py-[64px]  mt-[64px]"
        id="faq"
      >
        <div className="flex flex-col gap-[64px] justify-center items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-[#101828] text-3xl md:text-4xl leading-[44px] tracking-tight font-semibold font-inter text-center">
              FAQs: All You Need to Know
            </h1>
            <p className="text-lg md:text-xl md:leading-[30px] leading-7 font-normal font-inter text-[#667085] text-center">
              Everything you need to know about the product and billing.
            </p>
          </div>
          <div className="max-w-[768px] flex flex-col gap-[32px] justify-center items-center m-auto">
            <div className="w-full flex flex-col gap-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-[#EAECF0] pb-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleIndex(index)}
                  >
                    <h4 className="text-lg leading-7 font-medium font-inter text-[#101828] hover:underline transition duration-300">
                      {faq.question}
                    </h4>
                    <div className="text-xl ml-4">
                      {openIndex === index ? (
                        <i className="ri-indeterminate-circle-line text-[#433D71]"></i>
                      ) : (
                        <i className="ri-add-circle-line text-[#433D71]"></i>
                      )}
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index
                        ? "max-h-[500px] opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-base leading-6 font-normal font-inter text-[#667085]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[1280px] flex justify-center items-center md:mx-[32px] bg-[#F9FAFB] py-[32px] flex-col gap-[32px] rounded-[16px]">
            <div className="flex items-center">
              <img
                className="h-[48px] w-[48px] rounded-[200px] border-[1.5px] -mr-4 border-[#FFFFFF]"
                src={AvtarIcon}
                alt=""
              />
              <img
                className="h-[56px] w-[56px] rounded-[200px] border-[1.5px] z-20 border-[#FFFFFF]"
                src={AvtarIcon}
                alt=""
              />
              <img
                className="h-[48px] w-[48px] rounded-[200px] border-[1.5px] -ml-4 border-[#FFFFFF]"
                src={AvtarIcon}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-[#101828] text-xl leading-[30px] font-inter font-medium text-center">
                Still have questions?
              </h6>
              <p className="text-[#667085] md:text-lg text-base font-normal md:leading-7 leading-6 font-inter text-center">
                Can’t find the answer you’re looking for? Please chat to our
                friendly team.
              </p>
            </div>
            <Link
              to={""}
              className="text-[#FFFFFF] text-base leading-6 font-inter font-medium w-fit px-[18px] py-2.5 rounded-[8px] bg-[#433D71] cursor-pointer hover:bg-[#433D7133] transition duration-100 hover:text-[#433D71] "
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full md:max-w-[1297px]  m-auto md:py-[96px] py-[64px] px-4">
        <div className="flex flex-col gap-[56px]">
          <div className="flex justify-between items-center pb-[56px] border-b border-[#E4E4E7]">
            <div className="w-[250px] md:w-[405px] md:text-[32px] text-2xl leading-[42px] font-bold font-plus text-purple-700">
              About Finding College
            </div>
            <Link
              to={""}
              className="p-4 md:py-[14px] md:px-[51px] bg-[#18181B] text-[#ffffff] border-[1.5px] border-[#18181B] rounded-[60px] cursor-pointer text-sm leading-[22px] font-bold font-plus"
            >
              Need help
            </Link>
          </div>
          <div className="flex md:flex-row flex-col md:gap-[210px] gap-[64px] md:items-center">
            <div className="flex flex-col gap-[30px]">
              <h6 className="text-purple-700 text-base leading-6 font-bold font-plus">
                About Finding College
              </h6>
              <p className="text-sm leading-[22px] font-normal text-[#52525B] font-plus">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                dictum aliquet accumsan porta lectus ridiculus in mattis. Netus
                sodales in volutpat ullamcorper amet adipiscing fermentum.
              </p>
              <div className="flex gap-[34.34px]">
                <i className="ri-twitter-fill"></i>
                <i className="ri-facebook-fill"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-github-fill"></i>
              </div>
            </div>
            <div className="flex md:flex-row flex-col  md:items-center md:gap-[139px] gap-[64px]">
              {company.map((item, index) => (
                <ul key={index} className="flex flex-col gap-[21px]">
                  <p className="text-base leading-6 font-bold font-plus text-purple-700">
                    {item.title}
                  </p>
                  <div className="flex flex-col">
                    {Object.entries(item)
                      .filter(([key]) => key !== "title")
                      .map(([value], idx) => (
                        <li
                          key={idx}
                          className="text-sm text-[#18181B] font-plus font-normal leading-[40px] cursor-pointer hover:underline capitalize"
                        >
                          {value}
                        </li>
                      ))}
                  </div>
                </ul>
              ))}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
