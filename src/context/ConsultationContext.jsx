import { createContext, useContext, useState, useEffect } from "react";

// Context create
export const ConsultationContext = createContext();

// ✅ Custom Hook
export const useConsultations = () => useContext(ConsultationContext);

export const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Backend API Base URL
  const API_BASE = "https://your-backend-domain.com/api"; // <-- Replace with your backend URL
  const API_KEY = "YOUR_API_KEY_HERE"; // <-- Optional, if backend requires authentication

  // ✅ Fetch all consultations (on load)
  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/consultations`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      if (!res.ok) throw new Error("Failed to fetch consultations");

      const data = await res.json().catch(() => []);

      const enriched = Array.isArray(data)
        ? data.map((c) => ({
            ...c,
            keywords: c.keywords || [],
            summary: c.summary || "",
            comments: c.comments || [],
          }))
        : [];

      setConsultations(enriched);
      return enriched;
    } catch (err) {
      console.error("Error fetching consultations:", err.message);
      setError("⚠ Backend not available, showing sample data.");

      const dummy = [
        {
          id: 1,
          title: "Draft Companies (Amendment) Rules, 2025",
          description:
            "Stakeholders are invited to provide their comments on the proposed amendments to Companies Rules.",
          deadline: "2025-09-30",
          postedBy: "Department",
          status: "open",
          file: {
            name: "companies_rules.pdf",
            url: "/sample-pdfs/companies_rules.pdf",
          },
          comments: [
            {
              id: 1,
              author: "Vijaya Krishna S",
              time: "8 minutes ago",
              text: "There should be formulation of strict Rules and Regulations for YouTube contents...",
              files: [
                {
                  name: "YouTube_Regulations.pdf",
                  url: "/sample-pdfs/companies_rules.pdf",
                },
              ],
              sentiment: "Negative",
            },
            {
              id: 2,
              author: "Sindhu Manoj",
              time: "24 minutes ago",
              text: "We should promote Film Tourism. It will help in promotion of culture...",
              files: [],
              sentiment: "Neutral",
            },
          ],
          keywords: ["rules", "regulations", "film", "tourism"],
          summary:
            "AI summary: Suggestions include stricter rules for YouTube content and promoting film tourism.",
        },
      ];

      setConsultations(dummy);
      return dummy;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch comments for a consultation
  const fetchComments = async (consultationId) => {
    try {
      const res = await fetch(`${API_BASE}/consultations/${consultationId}/comments`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      if (!res.ok) throw new Error("Failed to fetch comments");

      const data = await res.json().catch(() => []);

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultationId ? { ...c, comments: Array.isArray(data) ? data : [] } : c
        )
      );
      return data;
    } catch (err) {
      console.error("Error fetching comments:", err.message);

      const dummy = [
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
      ];

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultationId ? { ...c, comments: dummy } : c
        )
      );

      return dummy;
    }
  };

  // ✅ Analyze comments (keywords)
  const analyzeComments = async (consultationId, selectedCommentIds = null) => {
    try {
      const url = `${API_BASE}/consultations/${consultationId}/analyze`;
      const payload = { selectedCommentIds }; // if null, backend uses all comments

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to analyze comments");

      const data = await res.json().catch(() => ({ keywords: [] }));

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultationId ? { ...c, keywords: data.keywords || [] } : c
        )
      );

      return data.keywords || [];
    } catch (err) {
      console.error("Error analyzing comments:", err.message);

      // fallback simple keywords
      let keywords = [];
      setConsultations((prev) =>
        prev.map((c) => {
          if (c.id === consultationId) {
            const commentsToUse = c.comments.filter((com) =>
              !selectedCommentIds || selectedCommentIds.includes(com.id)
            );
            const text = commentsToUse.map((com) => com.text).join(" ");
            const words = text.split(/\s+/);
            const freq = {};
            words.forEach((w) => {
              const word = w.toLowerCase().replace(/[^a-z]/g, "");
              if (word.length > 3) {
                freq[word] = (freq[word] || 0) + 1;
              }
            });
            keywords = Object.keys(freq)
              .sort((a, b) => freq[b] - freq[a])
              .slice(0, 5);
            return { ...c, keywords };
          }
          return c;
        })
      );

      return keywords;
    }
  };

  // ✅ Summarize comments
  const summarizeComments = async (consultationId, selectedCommentIds = null) => {
    try {
      const url = `${API_BASE}/consultations/${consultationId}/summarize`;
      const payload = { selectedCommentIds }; // if null, backend uses all comments

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to summarize comments");

      const data = await res.json().catch(() => ({ summary: "" }));

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultationId ? { ...c, summary: data.summary || "" } : c
        )
      );

      return data.summary || "";
    } catch (err) {
      console.error("Error summarizing comments:", err.message);

      const dummySummary =
        "AI summary (offline): Users suggested stricter rules and promotion of film tourism.";

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultationId ? { ...c, summary: dummySummary } : c
        )
      );

      return dummySummary;
    }
  };

  return (
    <ConsultationContext.Provider
      value={{
        consultations,
        loading,
        error,
        fetchConsultations,
        fetchComments,
        analyzeComments,
        summarizeComments,
        setConsultations,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};
