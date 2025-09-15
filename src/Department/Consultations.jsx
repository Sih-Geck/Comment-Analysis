import React, { useState } from "react";
import { useConsultations } from "../context/ConsultationContext";

export default function ConsultationForm() {
  const { consultations, addConsultation } = useConsultations();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    file: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newConsult = {
      title: formData.title,
      description: formData.description,
      deadline: formData.deadline,
      postedBy: "Department",
      status: "Open",
      file: formData.file ? formData.file.name : "No File",
    };

    // ✅ Context me save
    addConsultation(newConsult);

    // Reset form
    setFormData({ title: "", description: "", deadline: "", file: null });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Post New Consultation</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
            placeholder="Enter consultation title"
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Attach File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Consultation
        </button>
      </form>

      {/* Table of Posted Consultations */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Posted Consultations</h2>
        {consultations.length === 0 ? (
          <p>No consultations posted yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Deadline</th>
                <th className="p-2 border">File</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{c.id}</td>
                  <td className="p-2 border">{c.title}</td>
                  <td className="p-2 border">{c.deadline}</td>
                  <td className="p-2 border">{c.file || "No File"}</td>
                  <td className="p-2 border">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
