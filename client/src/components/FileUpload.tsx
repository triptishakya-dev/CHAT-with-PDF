"use client";
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUploadButton = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          setSelectedFile(file);
          const formData = new FormData();
          formData.append("pdf", file);
          await fetch("http://localhost:8000/upload/pdf", {
            method: "POST",
            body: formData,
          });
          console.log("File Uploaded");
        }
      }
    });
    el.click();
  };

  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center p-8 bg-white">
      {/* Main Card Container */}
      <div className="w-full max-w-2xl space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3 mt-30">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
            <UploadCloud className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Upload Your PDF</h2>
          <p className="text-gray-600 text-base max-w-md mx-auto">
            Upload your document and ask questions to get instant answers with AI-powered insights
          </p>
        </div>

        {/* Upload Zone */}
        {!selectedFile && (
          <div
            onClick={handleFileUploadButton}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-purple-400 transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UploadCloud className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800 mb-1">
                    Drop your PDF here
                  </p>
                  <p className="text-sm text-gray-500">
                    or <span className="text-purple-600 font-medium">browse</span> to choose a file
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">PDF only</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">Max 10MB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected File Display */}
        {selectedFile && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-emerald-900 truncate">{selectedFile.name}</p>
              <p className="text-sm text-emerald-600">
                {selectedFile.size < 1024 * 1024
                  ? `${(selectedFile.size / 1024).toFixed(2)} KB`
                  : `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleFileUploadButton}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            {selectedFile ? "Choose Another File" : "Select File"}
          </button>
        </div>

        {/* Info Footer */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <p className="text-sm text-blue-900 leading-relaxed">
            Your PDF will be processed securely. Once uploaded, you can ask questions and get instant answers with source references.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
