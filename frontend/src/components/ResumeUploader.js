import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UploadCloud, FileText, X } from "lucide-react";
import ResumeDetails from "./ResumeDetails";

const API_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:5001") + "/api/resumes";

function LoadingSpinner() {
  // Define the stages of the loading process
  const stages = [
    { text: "Uploading your resume securely...", progress: 10 },
    { text: "Parsing the PDF document...", progress: 30 },
    { text: "Sending data to the AI for analysis...", progress: 50 },
    { text: "The AI is reading your experience...", progress: 70 },
    { text: "Generating feedback and rating...", progress: 90 },
    { text: "Finalizing the analysis...", progress: 100 },
  ];

  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // This effect will run as long as we haven't reached the last stage
    if (currentStage < stages.length - 1) {
      // Set a timeout to move to the next stage, simulating progress
      const timeout = setTimeout(() => {
        setCurrentStage(currentStage + 1);
      }, 2000); // Simulate a 2-second delay for each stage

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [currentStage, stages.length]);

  const currentProgress = stages[currentStage].progress;
  const currentText = stages[currentStage].text;

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{currentText}</p>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setAnalysis(null);
      setError("");
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAnalysis(response.data);
    } catch (err) {
      setError(
        "Failed to analyze resume. The AI service may be busy or an error occurred. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setAnalysis(null);
    setError("");
  };

  return (
    <div>
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="uploader-container">
            {!file && (
              <>
                <h3>Upload Your Resume</h3>
                <div
                  className={`drop-zone ${isDragOver ? "drag-over" : ""}`}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <input
                    type="file"
                    id="file-input"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <UploadCloud className="upload-icon" size={48} />
                  <p>
                    <strong>Drag & drop your PDF here</strong> or click to
                    browse.
                  </p>
                </div>
              </>
            )}

            {file && !analysis && (
              <div>
                <FileText size={40} color="#4a90e2" />
                <p className="file-name">{file.name}</p>
                <button
                  onClick={handleSubmit}
                  className="primary-button"
                  disabled={loading}
                >
                  Analyze Resume
                </button>
                <button
                  onClick={() => setFile(null)}
                  style={{
                    marginLeft: "10px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <X color="#e74c3c" />
                </button>
              </div>
            )}

            {analysis && (
              <div>
                <h3>Analysis Complete!</h3>
                <p>
                  Scroll down to see your results. You can upload another resume
                  below.
                </p>
                <button onClick={resetState} className="primary-button">
                  Analyze Another Resume
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && !loading && <div className="error-message">{error}</div>}

      {analysis && <ResumeDetails details={analysis} />}
    </div>
  );
}

export default ResumeUploader;
