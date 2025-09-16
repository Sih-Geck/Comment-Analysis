import { useConsultations } from "../context/ConsultationContext";
import { useState } from "react";

export default function EConsultation() {
  const { consultations, addComment } = useConsultations(); // ✅ addComment context se
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
    city: "",
    comment: "",
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
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit -> Context -> Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedConsultation) return;

    const newComment = {
      ...formData,
      consultationId: selectedConsultation.id, // kis consultation pe comment kiya
      date: new Date().toISOString(),
    };

    try {
     await addComment(selectedConsultation.id, newComment);
 // ✅ context ke through backend pe save
      alert("Your comment has been submitted!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment, please try again!");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">E-Consultation</h1>
      <p className="text-1xl text-gray-800 mb-9">
        The <strong>E-Consultation Module</strong> is an online platform that
        enables stakeholders, experts, and citizens to share their views and
        feedback on proposed legislations, amendments, and policy initiatives,
        thereby promoting transparency and participatory governance.
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

      {/* ✅ Posted Consultations as Cards */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Posted Consultations
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {consultations.length > 0 ? (
          consultations.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-blue-900">{c.title}</h3>
              <p className="text-gray-600 my-2">{c.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Deadline: <span className="font-medium">{c.deadline}</span>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Posted By: <span className="font-medium">{c.postedBy}</span>
              </p>

              {/* ✅ Comment Button */}
              <button
                onClick={() => handleOpenModal(c)}
                className="mt-3 inline-block px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
              >
                Comment
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No consultations posted yet...</p>
        )}
      </div>

      {/* ✅ Modal with Comment Form */}
      {isModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-transparent backdrop-brightness-75 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Comment on: {selectedConsultation.title}
            </h2>
            <div className="border-b-5 border-blue-900 mb-6"></div>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              {/* Row wise fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <span className="font-semibold">Name *</span> :
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border px-2 py-1 flex-1 rounded"
                  />
                </label>

                <label className="flex items-center gap-2">
                  <span className="font-semibold">Email *</span> :
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border px-2 py-1 flex-1 rounded"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <span className="font-semibold">Country *</span> :
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="border px-2 py-1 flex-1 rounded"
                  />
                </label>
                <label className="flex items-center gap-2">
                  <span className="font-semibold">State *</span> :
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="border px-2 py-1 flex-1 rounded"
                  />
                </label>
              </div>

              <label className="flex items-center gap-2 w-100">
                <span className="font-semibold">City *</span> :
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 flex-1 rounded"
                />
              </label>

              {/* Comment Box */}
              <label className="flex flex-col gap-2">
                <span className="font-semibold">Comment *</span> :
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  className="border px-2 py-2 rounded h-28"
                />
              </label>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
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
