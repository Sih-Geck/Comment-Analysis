import { createContext, useContext, useState } from "react";

// Context create
export const ConsultationContext = createContext();

// ✅ Custom Hook
export const useConsultations = () => {
  return useContext(ConsultationContext);
};

export const ConsultationProvider = ({ children }) => {
  // Initial dummy consultations
  const [consultations, setConsultations] = useState([
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
        url: "/sample-pdfs/companies_rules.pdf", // dummy sample pdf
      },
      comments: [], // ✅ comments add kiya
    },
    {
      id: 2,
      title: "LLP (Amendment) Bill, 2025",
      description:
        "Suggestions are sought regarding ease of compliance for LLPs under the new bill.",
      deadline: "2025-09-15",
      postedBy: "Department",
      status: "closed",
      file: null,
      comments: [], // ✅ comments add kiya
    },
  ]);

  // ✅ Consultation add karne ka function
  const addConsultation = (newConsult) => {
    setConsultations((prev) => {
      const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      return [
        ...prev,
        {
          id: newId,
          comments: [], // har new consult me empty comments
          ...newConsult,
        },
      ];
    });
  };

  // ✅ Comment add karne ka function
  const addComment = (consultationId, commentData) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === consultationId
          ? {
              ...c,
              comments: [
                ...c.comments,
                {
                  id: c.comments.length + 1,
                  ...commentData,
                },
              ],
            }
          : c
      )
    );

    // 🔥 Future: Backend API call bhi yahin hoga
    // await fetch(`/api/consultations/${consultationId}/comments`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(commentData),
    // });
  };

  return (
    <ConsultationContext.Provider
      value={{ consultations, addConsultation, addComment }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};
