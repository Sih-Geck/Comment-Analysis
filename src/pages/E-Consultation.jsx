import { useConsultations } from "../context/ConsultationContext";

export default function EConsultation() {
  const { consultations } = useConsultations();

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">E-Consultation</h1>
      <p className="text-gray-700 mb-8">
        The <strong>E-Consultation Module</strong> is an initiative of the
        Ministry of Corporate Affairs to seek valuable suggestions and comments
        from stakeholders on draft legislations, amendments, and policies.
      </p>

      <div className="bg-blue-100 border-l-4 border-blue-600 p-6 rounded-lg mb-10">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Participate Now
        </h2>
        <p className="text-gray-700">
          Provide your feedback on draft legislations and help shape corporate
          governance in India.
        </p>
      </div>

      {/* Active Consultations */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Active Consultations
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {consultations
          .filter((c) => c.status === "Open")
          .map((c) => (
            <div
              key={c.id}
              className="border rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-blue-900">{c.title}</h3>
              <p className="text-gray-600 my-2">{c.description}</p>
              <p className="text-sm text-gray-500">
                Deadline: <span className="font-medium">{c.deadline}</span>
              </p>
              <p className="text-sm text-gray-500">
                Posted By: <span className="font-medium">{c.postedBy}</span>
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700">
                Submit Feedback
              </button>
            </div>
          ))}
      </div>

      {/* Past Consultations */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Past Consultations
      </h2>
      <div className="space-y-4">
        {consultations
          .filter((c) => c.status === "Closed")
          .map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <h3 className="font-semibold text-gray-700">{c.title}</h3>
              <p className="text-sm text-gray-500">Closed on {c.deadline}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
