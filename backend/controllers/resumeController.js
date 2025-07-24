const analysisService = require("../services/analysisService");
const db = require("../db");

exports.uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const resumeText = await analysisService.parsePdf(req.file.buffer);
    const analysisResult = await analysisService.analyzeResume(resumeText);

    // Destructure the complete result object
    const {
      name,
      email,
      phone,
      linkedin_url,
      portfolio_url,
      summary,
      work_experience,
      education,
      technical_skills,
      soft_skills,
      projects,
      certifications,
      resume_rating,
      improvement_areas,
      upskill_suggestions,
    } = analysisResult;

    // The query now includes ALL columns from your table schema
    const query = `
      INSERT INTO resumes(
        file_name, name, email, phone, linkedin_url, portfolio_url, summary, 
        work_experience, education, technical_skills, soft_skills, projects, 
        certifications, resume_rating, improvement_areas, upskill_suggestions
      )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;
    `;

    // The values array now contains all the data, stringifying the JSON parts
    const values = [
      req.file.originalname,
      name,
      email,
      phone,
      linkedin_url,
      portfolio_url,
      summary,
      JSON.stringify(work_experience || []),
      JSON.stringify(education || []),
      JSON.stringify(technical_skills || []),
      JSON.stringify(soft_skills || []),
      JSON.stringify(projects || []),
      JSON.stringify(certifications || []),
      resume_rating,
      improvement_areas,
      JSON.stringify(upskill_suggestions || []),
    ];

    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error in uploadResume controller:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    // This can remain simple for the table view
    const { rows } = await db.query(
      "SELECT id, file_name, name, uploaded_at, resume_rating FROM resumes ORDER BY uploaded_at DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting all resumes:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    // The query for details must select ALL columns
    const { rows } = await db.query("SELECT * FROM resumes WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Resume not found." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error getting resume by ID:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};
