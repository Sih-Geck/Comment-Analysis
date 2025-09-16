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

  // Remove selected file
  const removeFile = () => {
    setFormData({
      ...formData,
      file: null,
    });

    // input ko reset karna (file input clear)
    const input = document.getElementById("file-upload");
    if (input) input.value = "";
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    const status = formData.deadline >= today ? "open" : "closed";

    const fileUrl = formData.file ? URL.createObjectURL(formData.file) : null;

    const newConsult = {
      title: formData.title,
      description: formData.description,
      deadline: formData.deadline,
      postedBy: "Department",
      status,
      file: formData.file ? { name: formData.file.name, url: fileUrl } : null,
    };

    addConsultation(newConsult);

    // Reset form (file भी clear होगा)
    setFormData({ title: "", description: "", deadline: "", file: null });
    const input = document.getElementById("file-upload");
    if (input) input.value = "";
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

        {/* 🚀 Improved File Upload Section */}
        <div>
          <label className="block font-semibold mb-2">
            Attach File (PDF only)
          </label>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-50 h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
          >
            <svg
              className="w-8 h-8 text-gray-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-6m0 0l-4 4m4-4l4 4"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Click to upload</span> or drag &
              drop
            </p>
            <p className="text-xs text-gray-400">Only PDF files are allowed</p>
            <input
              id="file-upload"
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Show selected file + Remove option */}
          {formData.file && (
            <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
              <p className="text-sm text-green-600 font-medium">
                Selected: {formData.file.name}
              </p>
              <button
                type="button"
                onClick={removeFile}
                className="ml-4 text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                ❌ Remove
              </button>
            </div>
          )}
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
                  <td className="p-2 border">
                    {c.file ? (
                      <a
                        href={c.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {c.file.name}
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td
                    className={`p-2 border font-medium ${
                      c.status === "open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {c.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
