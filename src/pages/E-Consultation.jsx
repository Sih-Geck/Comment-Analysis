import { useConsultations } from "../context/ConsultationContext";
import { useState } from "react";

export default function EConsultation() {
  const { consultations, addComment } = useConsultations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
    city: "",
    comment: "",
    pdfFiles: [], // ✅ multiple files ke liye
  });

  const handleOpenModal = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConsultation(null);
    setFormData({
      name: "",
      email: "",
      country: "",
      state: "",
      city: "",
      comment: "",
      pdfFiles: [],
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ multiple file selection
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pdfFiles: [...formData.pdfFiles, ...Array.from(e.target.files)],
    });
  };

  // ✅ remove single file
  const handleRemoveFile = (index) => {
    const updatedFiles = [...formData.pdfFiles];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, pdfFiles: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedConsultation) return;

    const newComment = {
      ...formData,
      consultationId: selectedConsultation.id,
      date: new Date().toISOString(),
    };

    try {
      await addComment(selectedConsultation.id, newComment);
      alert("Your comment has been submitted!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment, please try again!");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4 text-center sm:text-left">
        E-Consultation
      </h1>
      <p className="text-base text-gray-700 mb-8 max-w-3xl leading-relaxed text-center sm:text-left">
        The <strong>E-Consultation Module</strong> is an online platform that
        enables stakeholders, experts, and citizens to share their views and
        feedback on proposed legislations, amendments, and policy initiatives,
        thereby promoting transparency and participatory governance.
      </p>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-sm mb-10">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Participate Now
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Provide your feedback on draft legislations and help shape corporate
          governance in India.
        </p>
      </div>

      {/* Consultations list */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Posted Consultations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {consultations.length > 0 ? (
          consultations.map((c) => (
            <div
              key={c.id}
              className="border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {c.title}
              </h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                {c.description}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Deadline:{" "}
                <span className="font-medium text-gray-800">{c.deadline}</span>
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Posted By:{" "}
                <span className="font-medium text-gray-800">{c.postedBy}</span>
              </p>

              <button
                onClick={() => handleOpenModal(c)}
                className="mt-2 inline-block px-4 py-2 text-sm font-medium bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Comment
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No consultations posted yet...</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Comment on: {selectedConsultation.title}
            </h2>
            <div className="border-b border-gray-200 mb-6"></div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm">
                  <span className="font-medium mb-1">Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  <span className="font-medium mb-1">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm">
                  <span className="font-medium mb-1">Country *</span>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  <span className="font-medium mb-1">State *</span>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </label>
              </div>

              <label className="flex flex-col text-sm">
                <span className="font-medium mb-1">City *</span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>

              <label className="flex flex-col text-sm">
                <span className="font-medium mb-1">Comment *</span>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
                />
              </label>

              {/* ✅ PDF Upload */}
              <label className="flex flex-col text-sm">
                <span className="font-medium mb-1">Upload PDFs (optional)</span>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {formData.pdfFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.pdfFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                      >
                        <span className="text-green-700 text-sm">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Remove file"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </label>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
