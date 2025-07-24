import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; // Make sure this is imported
import { Eye, X } from "lucide-react";
import ResumeDetails from "./ResumeDetails";

const API_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:5001") + "/api/resumes";

// This line is crucial for the modal to work correctly!
Modal.setAppElement("#root");

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setResumes(response.data);
      } catch (err) {
        setError("Failed to fetch past resumes.");
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedResume(response.data);
      setIsModalOpen(true); // This opens the modal
    } catch (err) {
      setError("Failed to fetch resume details.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResume(null);
  };

  if (loading) return <p>Loading history...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="card">
      <h3>Previously Analyzed Resumes</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Name</th>
            <th>Uploaded At</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id}>
              <td>{resume.file_name}</td>
              <td>{resume.name}</td>
              <td>{new Date(resume.uploaded_at).toLocaleString()}</td>
              <td>{resume.resume_rating}/10</td>
              <td>
                <button
                  onClick={() => handleViewDetails(resume.id)}
                  className="secondary-button"
                >
                  <Eye size={16} style={{ marginRight: "5px" }} /> View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* This is the Modal component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Resume Details"
        className="modal-content"
        overlayClassName="ReactModal__Overlay"
      >
        <button onClick={closeModal} className="modal-close-button">
          <X size={20} />
        </button>
        {/* The details are rendered inside the modal */}
        {selectedResume && <ResumeDetails details={selectedResume} />}
      </Modal>
    </div>
  );
}

export default PastResumesTable;
