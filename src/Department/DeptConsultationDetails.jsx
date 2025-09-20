import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConsultationContext } from "../context/ConsultationContext";

export default function DeptConsultationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    consultations,
    fetchComments,
    analyzeComments,
    summarizeComments,
  } = useContext(ConsultationContext);

  const consultation = consultations.find((c) => String(c.id) === String(id));

  const [expandedComments, setExpandedComments] = useState({});
  const [loadingComments, setLoadingComments] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [summary, setSummary] = useState("");
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [localComments, setLocalComments] = useState([]); // fallback safe
  const [selectedComments, setSelectedComments] = useState([]); // ✅ selected comment IDs

  const API_BASE = "http://localhost:5000/api"; // same as backend

  // ✅ Fetch Comments (with dummy fallback)
  useEffect(() => {
    if (!consultation) return;

    const loadComments = async () => {
      setLoadingComments(true);
      try {
        await fetchComments(consultation.id);
        setLocalComments(consultation.comments || []);
      } catch (error) {
        console.error("Backend not ready, using dummy comments.");
        setLocalComments([
          {
            id: 101,
            author: "Sample User",
            time: "2 mins ago",
            text: "This is a dummy comment. Backend will replace this.",
            files: [],
            sentiment: "Positive",
          },
          {
            id: 102,
            author: "Guest",
            time: "5 mins ago",
            text: "Another fallback comment for testing UI only.",
            files: [],
            sentiment: "Neutral",
          },
        ]);
      } finally {
        setLoadingComments(false);
      }
    };

    loadComments();
  }, [consultation]);

  // ✅ Auto-fetch Keywords (with dummy fallback)
  useEffect(() => {
    if (!consultation) return;
    const loadKeywords = async () => {
      setLoadingKeywords(true);
      try {
        await analyzeComments(consultation.id);
        setKeywords(consultation.keywords || []);
      } catch (err) {
        console.error("Keyword analysis failed", err);
        setKeywords(["Regulations", "YouTube", "Tourism", "Culture"]);
      } finally {
        setLoadingKeywords(false);
      }
    };
    loadKeywords();
  }, [consultation]);

  // ✅ Summarize Comments with selection or all
  const handleSummarize = async () => {
    if (!consultation) return;

    setLoadingSummary(true);
    try {
      // If no comment selected → summarize all comments
      const commentsToSummarize =
        selectedComments.length > 0
          ? localComments.filter((c) => selectedComments.includes(c.id))
          : localComments;

      // Include attached file URLs in the text
      const preparedComments = commentsToSummarize.map((c) => ({
        ...c,
        text:
          c.text +
          (c.files?.length ? " " + c.files.map((f) => f.url).join(" ") : ""),
      }));

      const res = await fetch(
        `${API_BASE}/consultations/${consultation.id}/summarize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comments: preparedComments }),
        }
      );

      const data = await res.json();
      setSummary(data.summary || "AI summary not available.");
    } catch (err) {
      console.error("Summarization failed", err);
      setSummary(
        "AI summary (dummy): Selected or all comments summarized."
      );
    } finally {
      setLoadingSummary(false);
    }
  };

  const toggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleSelect = (commentId) => {
    setSelectedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
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
      {/* 🔹 Consultation Main Card */}
      <div className="p-4 md:p-6 bg-white rounded-lg shadow">
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
            {consultation.status || "Unknown"}
          </span>
        </div>

        <p className="text-gray-600 mb-2">
          <strong>Deadline:</strong> {consultation.deadline || "—"}
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">
            {consultation.description || "No description available."}
          </p>
        </div>

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
      </div>

      {/* 🔹 Keywords */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Keywords</h2>
        {loadingKeywords ? (
          <p className="text-gray-500">Analyzing comments...</p>
        ) : keywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        ) : (
          <p>No keywords available.</p>
        )}
      </div>

      {/* 🔹 AI Summarize */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI Summarize</h2>
        {!summary ? (
          <>
            <p className="text-gray-600 mb-3">
              Select comments (optional) and click the button below to
              generate AI summary.
            </p>
            <button
              onClick={handleSummarize}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loadingSummary}
            >
              {loadingSummary ? "Summarizing..." : "Run AI Summarize"}
            </button>
          </>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
        )}
      </div>

      {/* 🔹 Comments */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>

        {loadingComments && (
          <p className="text-blue-500 text-sm mb-3">Loading comments...</p>
        )}

        {Array.isArray(localComments) && localComments.length > 0 ? (
          <div className="space-y-4">
            {localComments.map((comment) => {
              const isExpanded = expandedComments[comment.id] || false;
              const isLong = comment.text?.length > 200;
              const displayText = isExpanded
                ? comment.text
                : comment.text?.slice(0, 200);
              const isSelected = selectedComments.includes(comment.id);

              return (
                <div
                  key={comment.id}
                  className={`rounded-lg p-4 border flex flex-col md:flex-row justify-between gap-4 ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(comment.id)}
                        className="mr-2"
                      />
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                        {comment.author ? comment.author[0] : "?"}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">
                          {comment.author || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {comment.time || "—"}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 whitespace-pre-wrap">
                      {displayText}
                      {!isExpanded && isLong && "..."}
                    </p>

                    {isLong && (
                      <button
                        onClick={() => toggleExpand(comment.id)}
                        className="text-blue-600 text-sm mt-1 hover:underline"
                      >
                        {isExpanded ? "View Less" : "View More"}
                      </button>
                    )}

                    {comment.files && comment.files.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Attachments:
                        </h4>
                        {comment.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 mb-2"
                          >
                            <span className="text-sm text-gray-600">
                              📄 {file.name}
                            </span>
                            <button
                              onClick={() =>
                                window.open(file.url || "#", "_blank")
                              }
                              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                            >
                              View PDF
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex items-start">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        comment.sentiment === "Positive"
                          ? "bg-green-100 text-green-700"
                          : comment.sentiment === "Negative"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {comment.sentiment || "Neutral"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
