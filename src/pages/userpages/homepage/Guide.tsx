import React, { useEffect, useRef, useState } from "react";
import UserLayout from "../../../components/user/UserLayout";

interface GuideCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const GuideCard: React.FC<GuideCardProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition-all">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-purple-700 font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const Guide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(
    "deciding-to-study-abroad"
  );

  const guides = [
    {
      title: "The ultimate guide to studying abroad",
      description:
        "Start your studying abroad journey with this introductory guide",
      imageUrl: "https://source.unsplash.com/400x300/?student,university",
    },
    {
      title: "8 studying abroad myths to ignore",
      description:
        "Here are the most common study abroad misconceptions to avoid.",
      imageUrl: "https://source.unsplash.com/400x300/?graduation,student",
    },
    {
      title: "Culture shock for international students",
      description: "Know how to tackle culture shock during study abroad",
      imageUrl: "https://source.unsplash.com/400x300/?lantern,asia",
    },
    {
      title: "How to look after your mental health as an international student",
      description:
        "Here's how to look after yourself mentally when studying abroad",
      imageUrl: "https://source.unsplash.com/400x300/?mentalhealth,student",
    },
  ];

  const sections = [
    { id: "deciding-to-study-abroad", label: "Deciding to study abroad" },
    { id: "choosing-a-university", label: "Choosing a university" },
    { id: "choosing-a-program", label: "Choosing a program" },
    { id: "application-process", label: "Application process" },
    { id: "fees-and-funding", label: "Fees & funding" },
    { id: "visas-and-travel", label: "Visas & travel" },
    { id: "enrollment", label: "Enrollment" },
    { id: "career-paths", label: "Career Paths" },
  ];

  // Refs to all section divs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        sectionRefs.current[section.id] = el;
        observer.observe(el);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Guides</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-16 overflow-y-auto">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-semibold text-purple-800 border-l-4 border-purple-500 pl-4 mb-6">
                  {section.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {guides.map((guide, idx) => (
                    <GuideCard key={idx} {...guide} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Side Navigation */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="border rounded-xl p-4 sticky top-24">
              <h3 className="text-sm text-gray-600 mb-2">Jump to section:</h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`block p-2 rounded-md text-sm transition-all ${
                        activeSection === section.id
                          ? "bg-purple-100 border-l-4 border-purple-500 font-semibold text-purple-800 pl-2"
                          : "text-gray-700 hover:bg-purple-50"
                      }`}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </UserLayout>
  );
};

export default Guide;
