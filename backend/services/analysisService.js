const OpenAI = require("openai");
const pdf = require("pdf-parse");
require("dotenv").config();

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The PDF parsing function remains the same
const parsePdf = async (pdfBuffer) => {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Could not parse the PDF file.");
  }
};


const analyzeResume = async (resumeText) => {
  
  const jsonStructure = {
    // Personal Details
    name: "string | null",
    email: "string | null",
    phone: "string | null",
    linkedin_url: "string | null",
    portfolio_url: "string | null",
    // Resume Content
    summary: "string | null",
    work_experience: [
      {
        role: "string",
        company: "string",
        duration: "string",
        description: ["string"],
      },
    ],
    education: [
      { degree: "string", institution: "string", graduation_year: "string" },
    ],
    projects: [
      { name: "string", description: "string", technologies: ["string"] },
    ],
    certifications: [
      { name: "string", issuing_organization: "string", year: "string" },
    ],
    // Skills
    technical_skills: ["string"],
    soft_skills: ["string"],
    // AI-Generated Feedback
    resume_rating:
      "number (A rating from 1 to 10 based on clarity, impact, and completeness)",
    improvement_areas:
      "string (A detailed, constructive paragraph explaining what can be improved.)",
    upskill_suggestions: [
      "string (A list of 3-5 specific, relevant skills to learn.)",
    ],
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          // FINAL PROMPT: Instructs the AI to do EVERYTHING
          content: `You are an expert technical recruiter. Your task is to do two things: 1) Extract all key information from the provided resume. 2) Provide a critical, insightful review of the resume. Your response MUST be a single, valid JSON object that conforms exactly to this structure: ${JSON.stringify(
            jsonStructure
          )}. Fill every field accurately. If a section is missing from the resume, return an empty array [] or null.`,
        },
        {
          role: "user",
          content: `Here is the resume text to analyze:\n\n"""${resumeText}"""`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const resultJson = response.choices[0].message.content;
    return JSON.parse(resultJson);
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    throw new Error("Failed to get analysis from AI service.");
  }
};

module.exports = { parsePdf, analyzeResume };
