# 📄 AI-Powered Resume Analyzer

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

A full-stack web application designed to help users improve their resumes. This tool allows users to upload a PDF resume, which is then parsed and analyzed by an AI model to provide a detailed review, including a rating, areas for improvement, and strategic upskilling suggestions.

---

## ✨ Features

- **📄 PDF Resume Upload:** A modern, user-friendly drag-and-drop interface for uploading resumes.
- **🧠 AI-Powered Analysis:** Leverages a powerful LLM (GPT-4o) to perform a deep analysis of the resume content.
- **📈 Resume Rating:** Provides a quantifiable score (1-10) based on clarity, impact, and professional formatting.
- **🎯 Constructive Feedback:** Identifies specific areas for improvement to make the resume more effective.
- **💡 Upskilling Suggestions:** Recommends relevant technical and soft skills to enhance the user's career profile.
- **🗄️ Historical Viewer:** Stores all past analyses in a PostgreSQL database and displays them in a clean, searchable table.
- **💻 Modal View:** View the full details of any past analysis in a professional pop-up modal.
- **🎨 Modern UI/UX:** A visually appealing and intuitive interface built with React.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Axios, Lucide React (for icons), React Modal
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **AI Integration:** OpenAI API (GPT-4o model)
- **PDF Parsing:** `pdf-parse`
- **File Handling:** `multer`

---

## 🚀 Getting Started: Local Setup

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/) (which includes npm)
- [PostgreSQL](https://www.postgresql.org/download/)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/Resume_Analyser.git](https://github.com/your-username/Resume_Analyser.git)
    cd Resume_Analyser
    ```

2.  **Set up the Backend**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install NPM packages
    npm install
    ```
    Create a `.env` file in the `backend` directory. This file will store your secret keys and database credentials. Copy the contents of `.env.example` (or the template below) into it.

    **`backend/.env` template:**
    ```env
    # Database Connection Details
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=resume_analyzer_db
    DB_PASSWORD=your_postgres_password_here
    DB_PORT=5432

    # OpenAI API Key
    OPENAI_API_KEY="sk-..."
    ```
    **Action:** Replace `your_postgres_password_here` with your PostgreSQL password and add your actual OpenAI API key.

3.  **Set up the PostgreSQL Database**
    - Open your PostgreSQL management tool (like pgAdmin).
    - Create a new database named `resume_analyzer_db`.
    - Open the Query Tool for this new database and run the following SQL command to create the necessary table:
    ```sql
    CREATE TABLE resumes (
        id SERIAL PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        linkedin_url VARCHAR(255),
        portfolio_url VARCHAR(255),
        summary TEXT,
        work_experience JSONB,
        education JSONB,
        technical_skills JSONB,
        soft_skills JSONB,
        projects JSONB,
        certifications JSONB,
        resume_rating INTEGER,
        improvement_areas TEXT,
        upskill_suggestions JSONB
    );
    ```

4.  **Set up the Frontend**
    ```bash
    # Navigate to the frontend directory from the root folder
    cd frontend

    # Install NPM packages
    npm install
    ```

### Running the Application

You will need to run the backend and frontend servers in two separate terminals.

1.  **Start the Backend Server**
    ```bash
    # In the /backend directory
    node server.js
    ```
    Your backend should now be running on `http://localhost:5001`.

2.  **Start the Frontend Server**
    ```bash
    # In the /frontend directory
    npm start
    ```
    Your React application should automatically open in your browser at `http://localhost:3000`.

You can now use the application locally!

---
