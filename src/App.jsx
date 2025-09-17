import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import EConsultation from "./pages/E-Consultation";
import DepartmentDashboard from "./Layouts/DepartmentDashboardlayout";
import DepartmentLogin from "./pages/Department-logins";

// Department pages
import DeptHome from "./Department/DeptHome";
import ManageUsers from "./Department/ManageUsers";
import Consultations from "./Department/Consultations";
import Reports from "./Department/Reports";
import DeptConsultationDetails from "./Department/DeptConsultationDetails";

// Context
import { ConsultationProvider } from "./context/ConsultationContext";

function App() {
  // ✅ base path local vs deploy ke liye
  const basename =
    import.meta.env.MODE === "development" ? "/" : "/Comment-Analysis";

  return (
    <ConsultationProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          {/* ✅ Public Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="E-consultation" element={<EConsultation />} />
            <Route path="department-logins" element={<DepartmentLogin />} />
          </Route>

          {/* ✅ Department Dashboard */}
          <Route path="/department-dashboard" element={<DepartmentDashboard />}>
            <Route index element={<DeptHome />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="consultations" element={<Consultations />} />
            <Route
              path="consultation/:id"
              element={<DeptConsultationDetails />}
            />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConsultationProvider>
  );
}

export default App;
