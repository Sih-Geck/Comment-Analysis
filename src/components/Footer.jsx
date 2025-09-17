import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const linkSections = [
    {
      title: "Quick Links",
      links: [
        "PMO",
        "NFCG",
        "Trademarks Portal",
        "MyGov.in",
        "Website Policies",
        "Institute of Cost Accountants of India",
        "XBRL V3",
      ],
    },
    {
      title: "Resources",
      links: [
        "ICAI(CA)",
        "RTI Online",
        "Invest India",
        "Principal Accounts Office",
        "IEPFA Portal",
        "NSE",
        "About Us",
      ],
    },
    {
      title: "Portals",
      links: [
        "IRDA",
        "SEBI",
        "In.Registry",
        "NVS Portal",
        "RBI",
        "Participate in Fight Against Corruption",
        "Help & FAQs",
      ],
    },
    {
      title: "More",
      links: [
        "BSE",
        "ICSI(CS)",
        "Public Grievance Portal",
        "Latest News",
        "Mobile App Policy",
        "Contact Us",
      ],
    },
  ];

  return (
    <footer className="bg-[#455A7C] text-white mt-10">
      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {linkSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-gray-400" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs sm:text-sm">
        <p className="mb-2">
          Disclaimer: This site is owned by Ministry of Corporate Affairs.
        </p>
        <p className="mb-2">Last Updated: {today}</p>
        <p className="mb-4">
          Best viewed in Edge 89.0, Firefox 83.0 or Chrome 89.0
        </p>

        {/* Social Icons */}
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <a
            href="https://x.com/MCA21India"
            target="_blank"
            aria-label="Twitter"
            className="hover:scale-110 transition-transform"
          >
            <BsTwitterX size={22} color="#1DA1F2" />
          </a>
          <a
            href="https://www.facebook.com/MCA21India"
            target="_blank"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <FaFacebook size={22} color="#1877F2" />
          </a>
          <a
            href="https://www.youtube.com/@MCA21India"
            target="_blank"
            aria-label="YouTube"
            className="hover:scale-110 transition-transform"
          >
            <FaYoutube size={22} color="#FF0000" />
          </a>
          <a
            href="https://www.instagram.com/mca21india/"
            target="_blank"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <FaInstagram size={22} color="#E4405F" />
          </a>
          <a
            href="https://www.linkedin.com/company/mca21india/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:scale-110 transition-transform"
          >
            <FaLinkedin size={22} color="#067df4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
