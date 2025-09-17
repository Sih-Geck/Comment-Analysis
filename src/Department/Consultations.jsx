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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const removeFile = () => {
    setFormData({ ...formData, file: null });
    const input = document.getElementById("file-upload");
    if (input) input.value = "";
  };

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
    setFormData({ title: "", description: "", deadline: "", file: null });
    const input = document.getElementById("file-upload");
    if (input) input.value = "";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        📢 Post New Consultation
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter consultation title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter description"
          ></textarea>
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-semibold mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-semibold mb-2">
            Attach File (PDF only)
          </label>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
          >
            <svg
              className="w-8 h-8 text-gray-500 mb-1"
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
              <span className="font-medium">Click to upload</span> or drag & drop
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

          {/* File Preview */}
          {formData.file && (
            <div className="mt-2 flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-100 p-2 rounded gap-2">
              <p className="text-sm text-green-600 font-medium">
                Selected: {formData.file.name}
              </p>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                ❌ Remove
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center md:justify-start">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Post Consultation
          </button>
        </div>
      </form>

      {/* Posted Consultations */}
      <div className="bg-white shadow rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-bold mb-4 text-center md:text-left">
          📋 Posted Consultations
        </h2>
        {consultations.length === 0 ? (
          <p className="text-center text-gray-500">
            No consultations posted yet.
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100 text-sm md:text-base">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">Deadline</th>
                    <th className="p-2 border">File</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 text-sm md:text-base"
                    >
                      <td className="p-2 border text-center">{c.id}</td>
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
                      <td className="p-2 border text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            c.status === "open"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid gap-4 md:hidden">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg shadow-sm bg-gray-50 p-4 space-y-2"
                >
                  <p className="text-xs text-gray-500">ID: {c.id}</p>
                  <p className="font-bold text-blue-700">{c.title}</p>
                  <p className="text-sm text-gray-600">
                    Deadline: <span className="font-medium">{c.deadline}</span>
                  </p>
                  <p className="text-sm">
                    File:{" "}
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
                  </p>
                  <p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.status === "open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
