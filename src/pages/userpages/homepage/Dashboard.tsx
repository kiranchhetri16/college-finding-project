import React, { useState } from "react";
import UserLayout from "../../../components/user/UserLayout";
import ill from "../../../assets/images/illustration.avif";
import { University2Logo, UniversityLogo, AvtarIcon } from "../../../assets/images/index";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const Icon = [
    { id: 1, name: University2Logo },
    { id: 2, name: UniversityLogo },
  ];

  const [openIndex, setOpenIndex] = useState(-1);
  const toggleIndex = (index: number) => setOpenIndex((prev) => (prev === index ? -1 : index));

  const faqData = [
    {
      question: "Are there any additional costs beyond the subscription fees?",
      answer:
        "No, Suga's pricing plans include all essential features and support. Additional costs may apply only if you choose optional training, custom development, or premium support packages.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Can I switch between pricing plans as my beauty business evolves?",
      answer: "Yes, you can switch plans anytime based on your needs. Changes will reflect in your next billing cycle.",
    },
    {
      question: "How can I contact support if I have issues?",
      answer: "You can contact us via our support chat, email, or by submitting a ticket through the dashboard.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial for all new users. No credit card required.",
    },
  ];

  const company = [
    { title: "Company", about: "About", feature: "Features", work: "Works", career: "Career" },
    { title: "Help", customer: "Customer Support", delivery: "Delivery Details", terms: "Terms & Conditions", policy: "Privacy Policy" },
    { title: "Resources", free: "Free eBooks", development: "Development Tutorial", blog: "How to - Blog", playlist: "Youtube Playlist" },
  ];

  return (
    <UserLayout>
      {/* HERO */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-14">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text */}
            <div className="w-full lg:max-w-[640px] text-center lg:text-left">
              <p className="text-xs sm:text-sm font-bold text-purple-700 tracking-wide">
                MEET FIND ME
              </p>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
                Your online study-abroad advisor
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-700">
                <span className="font-semibold">Studying abroad made easier:</span>{" "}
                We guide you at every stage, showing you what you need to do, when to do it, and how.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition">
                  Free study abroad roadmap
                </button>

                <button className="w-full sm:w-auto border border-purple-600 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-md font-semibold transition">
                  Find programs
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-[520px]">
              <div className="w-full overflow-hidden rounded-xl">
                <img
                  src={ill}
                  alt="Hero illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES STRIP */}
      <section className="w-full bg-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg sm:text-2xl text-center text-gray-900">
              Compare 400+ top universities worldwide
            </h2>

            <div className="flex flex-wrap gap-6 justify-center items-center">
              {Icon.map((item) => (
                <div key={item.id} className="h-[46px] w-[140px] sm:h-[50px] sm:w-[160px]">
                  <img src={item.name} alt="icon" className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#F0F0F0] py-12 md:py-16 mt-10" id="faq">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-10 items-center">
            <div className="text-center">
              <h1 className="text-[#101828] text-2xl sm:text-3xl md:text-4xl font-semibold">
                FAQs: All You Need to Know
              </h1>
              <p className="mt-3 text-base sm:text-lg md:text-xl text-[#667085]">
                Everything you need to know about the product and billing.
              </p>
            </div>

            <div className="w-full max-w-[768px] bg-white/50 rounded-xl border border-white/60 p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-[#EAECF0] pb-4">
                    <div
                      className="flex items-start justify-between gap-4 cursor-pointer"
                      onClick={() => toggleIndex(index)}
                    >
                      <h4 className="text-base sm:text-lg font-medium text-[#101828] hover:underline">
                        {faq.question}
                      </h4>

                      <div className="text-xl text-[#433D71] shrink-0">
                        {openIndex === index ? (
                          <i className="ri-indeterminate-circle-line"></i>
                        ) : (
                          <i className="ri-add-circle-line"></i>
                        )}
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openIndex === index ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm sm:text-base text-[#667085]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Still have questions card */}
            <div className="w-full max-w-[1280px] bg-[#F9FAFB] py-8 px-4 sm:px-8 rounded-2xl flex flex-col items-center gap-6">
              <div className="flex items-center">
                <img className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-[1.5px] -mr-3 border-white" src={AvtarIcon} alt="" />
                <img className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-[1.5px] z-20 border-white" src={AvtarIcon} alt="" />
                <img className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-[1.5px] -ml-3 border-white" src={AvtarIcon} alt="" />
              </div>

              <div className="text-center">
                <h6 className="text-[#101828] text-lg sm:text-xl font-medium">
                  Still have questions?
                </h6>
                <p className="text-[#667085] text-sm sm:text-base md:text-lg mt-2">
                  Can’t find the answer you’re looking for? Please chat to our friendly team.
                </p>
              </div>

              <Link
                to={""}
                className="text-white text-sm sm:text-base font-medium px-5 py-2.5 rounded-lg bg-[#433D71] hover:bg-[#372f66] transition"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / ABOUT */}
      <section className="w-full bg-white">
        <div className="max-w-[1297px] mx-auto py-12 md:py-20 px-4 md:px-8">
          <div className="flex flex-col gap-10">
            {/* Top row */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-8 border-b border-[#E4E4E7]">
              <div className="text-2xl md:text-[32px] leading-tight font-bold text-purple-700">
                About Finding College
              </div>
              <Link
                to={""}
                className="w-full md:w-auto text-center py-3 px-8 bg-[#18181B] text-white border border-[#18181B] rounded-full text-sm font-bold"
              >
                Need help
              </Link>
            </div>

            {/* Bottom content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* About */}
              <div className="flex flex-col gap-4">
                <h6 className="text-purple-700 text-base font-bold">
                  About Finding College
                </h6>
                <p className="text-sm text-[#52525B]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis.
                </p>
                <div className="flex gap-6 text-xl text-gray-700">
                  <i className="ri-twitter-fill"></i>
                  <i className="ri-facebook-fill"></i>
                  <i className="ri-instagram-line"></i>
                  <i className="ri-github-fill"></i>
                </div>
              </div>

              {/* Links */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-10">
                {company.map((item, index) => (
                  <div key={index}>
                    <p className="text-base font-bold text-purple-700">
                      {item.title}
                    </p>

                    <ul className="mt-4 flex flex-col gap-2">
                      {Object.entries(item)
                        .filter(([key]) => key !== "title")
                        .map(([_, value], idx) => (
                          <li
                            key={idx}
                            className="text-sm text-[#18181B] cursor-pointer hover:underline"
                          >
                            {value}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default Dashboard;
