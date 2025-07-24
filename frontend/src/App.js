import React, { useState } from "react";
import { FileText } from "lucide-react"; // Import an icon
import ResumeUploader from "./components/ResumeUploader";
import PastResumesTable from "./components/PastResumesTable";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("analysis");

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FileText size={40} />
          Resume Analyser AI
        </h1>
      </header>

      <nav className="App-nav">
        <button
          onClick={() => setActiveTab("analysis")}
          className={activeTab === "analysis" ? "active" : ""}
        >
          Analyze New Resume
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={activeTab === "history" ? "active" : ""}
        >
          View History
        </button>
      </nav>

      <main>
        {activeTab === "analysis" && <ResumeUploader />}
        {activeTab === "history" && <PastResumesTable />}
      </main>
    </div>
  );
}

export default App;
