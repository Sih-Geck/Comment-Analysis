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
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-3xl font-bold">
        </div>
      </section>

      {/* Services */}
      <section className="py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Used Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Register your Company", "Close your Company", "Register your LLP", "Close your LLP"].map(
            (item, i) => (
              <div
                key={i}
                className="bg-orange-500 text-white p-6 rounded-lg shadow hover:bg-orange-600 cursor-pointer"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-yellow-500 p-6 rounded-lg text-white">Ease of doing business</div>
          <div className="bg-red-500 p-6 rounded-lg text-white">Employee Corner</div>
          <div className="bg-green-600 p-6 rounded-lg text-white">Mediation Panel</div>
          <div className="bg-blue-600 p-6 rounded-lg text-white">Annual Reports</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
