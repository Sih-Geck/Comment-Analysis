// src/Department/DeptConsultationDetails.jsx

import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConsultationContext } from "../context/ConsultationContext";

export default function DeptConsultationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { consultations } = useContext(ConsultationContext);

  // id ke hisaab se consultation nikalna
  const consultation = consultations.find((c) => c.id === parseInt(id));

  if (!consultation) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">Consultation not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Title & Status */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{consultation.title}</h1>
        <span
          className={`px-3 py-1 text-sm rounded ${
            consultation.status === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {consultation.status}
        </span>
      </div>

      {/* Deadline */}
      <p className="text-gray-600 mb-2">
        <strong>Deadline:</strong> {consultation.deadline}
      </p>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">
          {consultation.description ||
            "No description available. (Future backend se data ayega)"}
        </p>
      </div>

      {/* Comment Summary (Dummy values for now) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold">120</h3>
          <p>Total Comments</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold">80</h3>
          <p>Positive</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold">40</h3>
          <p>Negative</p>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Edit Consultation
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Close Consultation
        </button>
      </div>
    </div>
  );
}
