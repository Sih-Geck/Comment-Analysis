import React from "react";
import BannerImg from "../assets/banner.jpeg";

const Home = () => {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative">
        <img
          src={BannerImg}
          alt="Banner"
          className="w-full h-[200px] md:h-[400px] lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl font-bold bg-black/30">
          {/* Agar banner ke upar koi heading dalni ho to yaha likho */}
        </div>
      </section>

      {/* Services */}
      <section className="py-10 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Frequently Used Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Register your Company",
            "Close your Company",
            "Register your LLP",
            "Close your LLP",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-orange-500 text-white p-6 rounded-lg shadow hover:bg-orange-600 cursor-pointer text-center font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          <div className="bg-yellow-500 p-6 rounded-lg text-white text-center font-semibold">
            Ease of doing business
          </div>
          <div className="bg-red-500 p-6 rounded-lg text-white text-center font-semibold">
            Employee Corner
          </div>
          <div className="bg-green-600 p-6 rounded-lg text-white text-center font-semibold">
            Mediation Panel
          </div>
          <div className="bg-blue-600 p-6 rounded-lg text-white text-center font-semibold">
            Annual Reports
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
