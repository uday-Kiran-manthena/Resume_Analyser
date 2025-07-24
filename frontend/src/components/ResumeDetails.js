import React from "react";
import {
  Star,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Wrench,
  UserCheck,
  Award,
  Target,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

const SkillBadge = ({ skill }) => <span className="skill-badge">{skill}</span>;

function ResumeDetails({ details }) {
  if (!details) return null;

  // --- Helper function to parse JSON fields from the database ---
  const parseJsonField = (field) => {
    if (!field) return [];
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch (e) {
        return []; // Return empty array if parsing fails
      }
    }
    return field; // Return as-is if already an object/array
  };

  const workExperience = parseJsonField(details.work_experience);
  const education = parseJsonField(details.education);
  const technicalSkills = parseJsonField(details.technical_skills);
  const softSkills = parseJsonField(details.soft_skills);
  const projects = parseJsonField(details.projects);
  const certifications = parseJsonField(details.certifications);
  const upskillSuggestions = parseJsonField(details.upskill_suggestions);

  return (
    <div className="resume-details">
      <h2>Analysis for {details.name || "the uploaded resume"}</h2>

      {/* --- AI-Generated Feedback Section (Top) --- */}
      <div className="card details-section">
        <h3>
          <Star size={20} /> Overall Resume Rating
        </h3>
        <div className="rating-display">{details.resume_rating}/10</div>
      </div>

      <div className="card details-section">
        <h3>
          <Target size={20} /> Key Areas for Improvement
        </h3>
        <p style={{ whiteSpace: "pre-line" }}>{details.improvement_areas}</p>
      </div>

      <div className="card details-section">
        <h3>
          <Lightbulb size={20} /> Strategic Upskilling Suggestions
        </h3>
        <ul>
          {upskillSuggestions?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* --- Extracted Data Section (Bottom) --- */}
      <div className="card details-section">
        <h3>
          <UserCheck size={20} /> Personal Details
        </h3>
        <p>
          <strong>Email:</strong> {details.email || "Not found"}
        </p>
        <p>
          <strong>Phone:</strong> {details.phone || "Not found"}
        </p>
        {details.linkedin_url && (
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={details.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {details.linkedin_url}
            </a>
          </p>
        )}
        {details.portfolio_url && (
          <p>
            <strong>Portfolio:</strong>{" "}
            <a
              href={details.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {details.portfolio_url}
            </a>
          </p>
        )}
      </div>

      <div className="card details-section">
        <h3>
          <FileText size={20} /> Professional Summary
        </h3>
        <p>{details.summary || "Not found"}</p>
      </div>

      <div className="card details-section">
        <h3>
          <Wrench size={20} /> Skills
        </h3>
        <h4>Technical Skills</h4>
        <div className="skills-container">
          {technicalSkills?.map((skill, index) => (
            <SkillBadge key={index} skill={skill} />
          ))}
        </div>
        <h4 style={{ marginTop: "20px" }}>Soft Skills</h4>
        <div className="skills-container">
          {softSkills?.map((skill, index) => (
            <SkillBadge key={index} skill={skill} />
          ))}
        </div>
      </div>

      <div className="card details-section">
        <h3>
          <Briefcase size={20} /> Work Experience
        </h3>
        {workExperience?.map((job, index) => (
          <div key={index} className="work-item">
            <h4>
              {job.role} at {job.company}
            </h4>
            <p>
              <em>{job.duration || "Duration not specified"}</em>
            </p>
            <ul>
              {job.description?.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card details-section">
        <h3>
          <GraduationCap size={20} /> Education
        </h3>
        {education?.map((edu, index) => (
          <div key={index} className="edu-item">
            <h4>{edu.degree}</h4>
            <p>
              {edu.institution} ({edu.graduation_year})
            </p>
          </div>
        ))}
      </div>

      <div className="card details-section">
        <h3>
          <LinkIcon size={20} /> Projects
        </h3>
        {projects?.map((project, index) => (
          <div key={index} className="project-item">
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <div className="skills-container">
              <strong>Technologies:</strong>{" "}
              {project.technologies?.map((tech, i) => (
                <SkillBadge key={i} skill={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card details-section">
        <h3>
          <Award size={20} /> Certifications
        </h3>
        {certifications?.map((cert, index) => (
          <div key={index} className="project-item">
            <h4>{cert.name}</h4>
            <p>
              {cert.issuing_organization} ({cert.year})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeDetails;
