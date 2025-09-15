import { createContext, useContext, useState } from "react";

// Context create
export const ConsultationContext = createContext();

// ✅ Custom Hook (use karne ke liye)
export const useConsultations = () => {
  return useContext(ConsultationContext);
};

export const ConsultationProvider = ({ children }) => {
  // Dummy consultations (abhi ke liye)
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      title: "Draft Companies (Amendment) Rules, 2025",
      description:
        "Stakeholders are invited to provide their comments on the proposed amendments to Companies Rules.",
      deadline: "2025-09-30",
      postedBy: "Department",
      status: "Open",
    },
    {
      id: 2,
      title: "LLP (Amendment) Bill, 2025",
      description:
        "Suggestions are sought regarding ease of compliance for LLPs under the new bill.",
      deadline: "2025-09-15",
      postedBy: "Department",
      status: "Closed",
    },
  ]);

  // consultation add karne ka function
  const addConsultation = (newConsult) => {
    setConsultations((prev) => [
      ...prev,
      { id: prev.length + 1, ...newConsult },
    ]);
  };

  return (
    <ConsultationContext.Provider value={{ consultations, addConsultation }}>
      {children}
    </ConsultationContext.Provider>
  );
};
