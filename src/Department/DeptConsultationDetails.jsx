import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConsultationContext } from "../context/ConsultationContext";

export default function DeptConsultationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { consultations } = useContext(ConsultationContext);

  const consultation = consultations.find((c) => c.id === parseInt(id));

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ AI Analysis States
  const [keywords, setKeywords] = useState([
    "Regulations",
    "YouTube",
    "Tourism",
    "Culture",
  ]);
  const [summary, setSummary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 Dummy comments for now
  useEffect(() => {
    const dummy = [
      {
        id: 1,
        author: "Vijaya Krishna S",
        time: "8 minutes ago",
        text: "There should be formulation of strict Rules and Regulations for YouTube contents...",
      },
      {
        id: 2,
        author: "Sindhu Manoj",
        time: "24 minutes ago",
        text: "We should promote Film Tourism. It will help in the promotion of culture and destinations of India...",
      },
    ];
    setComments(dummy);
    setLoading(false);
  }, [id]);

  // ✅ AI Summarize function
  const handleSummarize = async () => {
    // TODO: Replace with backend API call
    const fakeSummary =
      "Most comments emphasize stricter regulations for digital content and promoting cultural tourism .";
    setSummary(fakeSummary);
    setIsModalOpen(true); // Modal open
  };

  if (!consultation) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">
          Consultation not found
        </h2>
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
    <div>
      <div className="p-6 bg-white rounded-lg shadow">
        {/* Title & Status */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {consultation.title}
          </h1>
          <span
            className={`px-3 py-1 text-sm rounded ${
              consultation.status?.toLowerCase() === "open"
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
            {consultation.description || "No description available."}
          </p>
        </div>

        {/* ✅ PDF Attachment (Updated with button) */}
        {consultation.file && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Attached Document</h2>
            <button
              onClick={() => window.open(consultation.file.url, "_blank")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View PDF
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Edit Consultation
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Close Consultation
          </button>
        </div>
      </div>

      {/* ✅ Keywords Box */}
      <div className="bg-white mt-8 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* ✅ AI Summarize Box */}
      <div className="bg-white mt-6 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI Summarize</h2>
        <p className="text-gray-500 mb-4">
          Click the button below to generate AI summary of comments.
        </p>
        <button
          onClick={handleSummarize}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Run AI Summarize
        </button>
      </div>

      {/* ✅ Modal for AI Summary */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-brightness-75 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-200 rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              AI Generated Summary
            </h2>
            <p className="text-gray-700 mb-6 ">{summary}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="bg-white mt-8 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 p-4 mb-4">Comments</h2>

        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-6 p-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-0 rounded-lg bg-gray-100 p-4 shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">
                      {comment.author}
                    </p>
                    <p className="text-xs text-gray-500">{comment.time}</p>
                  </div>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
