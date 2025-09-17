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
  const [keywords] = useState(["Regulations", "YouTube", "Tourism", "Culture"]);
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
  const handleSummarize = () => {
    const fakeSummary =
      "Most comments emphasize stricter regulations for digital content and promoting cultural tourism.";
    setSummary(fakeSummary);
    setIsModalOpen(true);
  };

  if (!consultation) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Consultation not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Main Card */}
      <div className="p-4 md:p-6 bg-white rounded-lg shadow">
        {/* Title & Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {consultation.title}
          </h1>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
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

        {/* PDF Attachment */}
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
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full md:w-auto">
            Edit Consultation
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto">
            Close Consultation
          </button>
        </div>
      </div>

      {/* Keywords */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
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

      {/* AI Summarize */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
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

      {/* AI Summary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 rounded-lg shadow-lg p-6 relative animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              AI Generated Summary
            </h2>
            <p className="text-gray-700 mb-6">{summary}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg bg-gray-50 p-4 border border-gray-200"
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
