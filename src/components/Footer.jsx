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

  return (
    <footer className="bg-[#455A7C] text-white mt-10">
      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                PMO
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                NFCG
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trademarks Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                MyGov.in
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Website Policies
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Institute of Cost Accountants of India
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                XBRL V3
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 mt-10 md:mt-12">
            <li>
              <a href="#" className="hover:underline">
                ICAI(CA)
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                RTI Online
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Invest India
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Principal Accounts Office
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                IEPFA Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                NSE
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 mt-10 md:mt-12">
            <li>
              <a href="#" className="hover:underline">
                IRDA
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                SEBI
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                In.Registry
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                NVS Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                RBI
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Participate in Fight Against Corruption
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Help & FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 mt-10 md:mt-12">
            <li>
              <a href="#" className="hover:underline">
                BSE
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                ICSI(CS)
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Public Grievance Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Latest News
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mobile App Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-400" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm">
        <p className="mb-2">
          Disclaimer: This site is owned by Ministry of Corporate Affairs.
        </p>
        <p className="mb-2">Last Updated: {today}</p>
        <p className="mb-4">
          The site is best viewed in Microsoft Edge 89.0, Firefox 83.0 or Chrome
          89.0
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://x.com/MCA21India"
            target="_blank"
            aria-label="Twitter"
            className="hover:scale-110 transition-transform"
          >
            <BsTwitterX size={24} color="#1DA1F2" />
          </a>
          <a
            href="https://www.facebook.com/MCA21India"
            target="_blank"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <FaFacebook size={24} color="#1877F2" />
          </a>
          <a
            href="https://www.youtube.com/@MCA21India"
            aria-label="YouTube"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <FaYoutube size={24} color="#FF0000" />
          </a>
          <a
            href="https://www.instagram.com/mca21india/"
            target="_blank"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <FaInstagram size={24} color="#E4405F" />
          </a>
          <a
            href="https://www.linkedin.com/company/mca21india/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:scale-110 transition-transform"
          >
            <FaLinkedin size={24} color="#067df4ff" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
