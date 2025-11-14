import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github, ExternalLink, Mail, MapPin, Award,
  Cpu, Database, Cloud, Code2, ShieldCheck, Globe2, BarChart3, Linkedin,Users, ClipboardList, ListTodo, Repeat,Wrench,Download
} from "lucide-react";
import "../assets/styles/resume.css"; // 
import profileImg from '../assets/profile.png';

// -----------------------------
// Profile Data
// -----------------------------
const PROFILE = {
  name: "Hina Lin (林筱凡)",
  title: "Project Manager｜AWS Certified",
  location: "Taiwan · Open to APAC",
  email: "hinalin.it12@gmail.com",
  phone: "+886 989901212",
  github: "https://github.com/hinait",
  linkedin: "https://www.linkedin.com/in/hinalinit",
  website: "https://hina.solutions",
};

const ROTATING_LINES = [
  "7+ years projects delivery",
  "Full‑stack internship: React · Node.js · AWS",
  "Bridging PM discipline with cloud development",
  "Scrum + Waterfall · client‑focused outcomes",
];

const SKILL_GROUPS = [
  {
    category: "Cloud",
    skills: [
      { label: "AWS", icon: Cloud },
      { label: "Nginx / SSL", icon: Globe2 },
    ],
  },
  {
    category: "Backend & System Integration",
    skills: [
      { label: "Node.js", icon: Cpu },
      { label: "MySQL", icon: Database },
      { label: "RESTful API", icon: Code2 },
      { label: "Postman", icon: Wrench },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { label: "React.js", icon: Code2 },
    ],
  },
  {
    category: "Project & Soft Skills",
    skills: [
      { label: "Project Management", icon: ClipboardList },
      { label: "Framework: Waterfall / Scrum", icon: Repeat },
      { label: "Stakeholder Management and Communication", icon: Users },
      { label: "Risk Identification and Mitigation", icon: ListTodo },
      { label: "Cross-functional Leadership and Facilitation", icon: BarChart3 },
    ],
  },
];

const CERTS = [
  { name: "AWS Certified Cloud Practitioner", when: "2025" },
  { name: "Certified Tester Foundation Level (ISTQB)", when: "2024" },
  { name: "Scrum Master", when: "2024" },
  { name: "IELTS 6.5", when: "2023" },
];

// -----------------------------
// Hooks
// -----------------------------
function useRotatingText(ref, messages, interval = 2600, fadeMs = 420) {
  useEffect(() => {
    if (!ref?.current || !messages?.length) return;
    let idx = 0;
    const el = ref.current;
    el.textContent = messages[0];
    el.style.opacity = "1";
    el.style.transition = `opacity ${fadeMs}ms ease`;
    const tick = () => {
      el.style.opacity = "0";
      setTimeout(() => {
        idx = (idx + 1) % messages.length;
        el.textContent = messages[idx];
        el.style.opacity = "1";
      }, fadeMs);
    };
    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [ref, messages, interval, fadeMs]);
}

// -----------------------------
// Pop up Window
// -----------------------------
function ConfirmModal({ show, onConfirm, onCancel, certName }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <p>Do you want to download<strong>{certName}?</strong></p>
         <div className="modal-buttons">
          <a
            className="btn-primary"
            onClick={onConfirm} 
          >
            Yes
          </a>

          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Components
// -----------------------------
const Chip = ({ children }) => <span className="chip">{children}</span>;

// -----------------------------
// Main Component
// -----------------------------
export default function ResumePage() {
  const rotatingRef = useRef(null);
  useRotatingText(rotatingRef, ROTATING_LINES);
  const tYear = useMemo(() => new Date().getFullYear(), []);
  
const [visitorCount, setVisitorCount] = React.useState(null);

useEffect(() => {
  fetch("https://rudet6yugb.execute-api.us-east-1.amazonaws.com/dev/getVisitorCount")
    .then((res) => res.json())
    .then((data) => setVisitorCount(data.count))
    .catch((err) => console.error("Fetch error:", err));
}, []);


const [showResumeModal, setShowResumeModal] = React.useState(false);

const handleResumeClick = () => {
  setShowResumeModal(true);
};

const confirmResumeDownload = () => {
  setShowResumeModal(false);
  window.open("/cv/HINA_CV.pdf", "_blank");
};

const cancelResumeDownload = () => {
  setShowResumeModal(false);
};

  return (
    <div className="resume-container">

      {/* Header */}
      <header className="resume-header">
        <div className="header-inner">
          <div className="brand-left">
            <span className="brand-badge">H</span>
            <span>{PROFILE.website.replace("https://", "")}</span>
          </div>
          <div className="header-actions">
            <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </div>
      </header>

{/* Hero */}
<div className="resume-hero">
   <div className="hero-inner">
    {/* 左側：文字 */}
    <div className="hero-text">
      <motion.h1 className="h1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {PROFILE.name}
      </motion.h1>
      <p className="subtitle">{PROFILE.title}</p>
      <p className="meta">
        <span><MapPin size={14} /> {PROFILE.location}</span>
        <span><Award size={14} /> Certifications: {CERTS.length}</span>
      </p>
      <p className="lead"><span ref={rotatingRef} /></p>
      <div className="action-row">
        <a className="btn-primary" style={{ cursor: "pointer" }} onClick={handleResumeClick}>
          <ExternalLink size={16} /> Download Resume
        </a>
        <a className="btn" href={`mailto:${PROFILE.email}`}><Mail size={16} /> Contact</a>
      </div>
    </div>

    {/* 右側：圖片 */}
    <img
      src={profileImg}
      alt="Hina Lin"
      className="profile-photo"
    />
  </div>
</div>


      {/* About Me */}
<div className="resume-section">
  <h2 className="h2">About Me</h2>
  <p className="lead">
   I am a Project Manager with 7+ years of NPI and product development experience across standard and ODM laptops, IoT devices, and networking products, including work with global clients such as Epson.<br />
    I am currently completing a Master of Information Technology in New Zealand and building hands-on full-stack and cloud projects (React/Node/AWS).<br />
    I am seeking opportunities in cloud engineering or software project management.<br />
  </p>
</div>

{/* Education */}
<div className="resume-section education-section">
  <h2 className="h2">Education</h2>

  <div className="edu-item">
    <h3 className="edu-school">University of Waikato</h3>
    <p className="edu-degree">Master of Information Technology</p>
    <p className="edu-meta">Hamilton, New Zealand · Feb 2024 – Nov 2025</p>
  </div>

  <div className="edu-item">
    <h3 className="edu-school">Feng Chia University</h3>
    <p className="edu-degree">Bachelor of Economics</p>
    <p className="edu-meta">Taichung, Taiwan · Sep 2011 – Sep 2015</p>
  </div>
</div>

{/* Work Experience */}
<div className="resume-section work-experience">
  <h2 className="h2">Work Experience</h2>
  <p className="lead">
    <strong>Full-Stack Developer & Project Manager – Nova IT Internship (July of 2025- Oct of 2025, New Zealand)</strong>
   Led cross-functional delivery as a Full-Stack Developer and Project Manager, aligning scope, timeline, and
deliverables with developers and testers.</p>
   <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Built the website end-to-end (React.js frontend, Node.js backend) integrated with FileMaker Database for
search/filter/export functions.</li>
      <li>Deployed the frontend on AWS Amplify and the backend on Amazon EC2 behind Nginx; configured a custom
domain for production.</li>
      <li>Software Project Management: Clarified client requirements into user stories ; tracked deliverables and
dependencies; coordinated developers and testers; produced status reports for stakeholders; facilitated Scrum
meetings and reviews.</li>
    </ul>
    <p className="lead">
    <strong>Senior Project Manager – CLEVO (Oct of 2020–Sep of 2023, Taipei)</strong>
    Led 13+ standard and ODM projects, including Epson, from RFQ to mass production using Waterfall.
    </p>
   <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
    <li>Coordinated project planning, RFQ preparation, and feasibility reviews with engineers</li>
      <li>Led kick-off and gate meetings with internal and client teams on scope, timeline, and deliverables.</li>
      <li>Managed cross-functional teams of 25+ across hardware, software,mechanical design, manufacturing, and supply
chain.</li>
      <li>Effectively managed schedule control, risk mitigation, and production throughout the entire product lifecycle.</li>
      <li>Stakeholder management: primary liaison for international clients (Epson); delivered clear status updates
(progress, risks) and managed expectations.</li>
    </ul>
      <p className="lead">
    <strong>Project Manager – VIVOTEK (July of 2019–Sep of 2020, Taipei)</strong>
    Led IoT projects for radar and camera systems in the smart home market.</p>
       <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Managed prototypes IoT projects, project schedules, production planning, and issue tracking.</li>
      <li>Held regular Scrum meetings with engineering teams (hardware, mechanical, firmware, software) to monitor
project progress.</li>
    </ul>
      <p className="lead">
     <strong>Assistant Project Manager – CASWELL (Sep of 2017–April of 2019, Taipei)</strong>
    Led NPI(New Product Introduction) and lifecycle management for networking products.</p>
       <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Managed project schedules, issue tracking, and production planning across NPI stages.</li>
      <li>Oversaw the lifecycle of network cards, resolving quality issues and material shortages.</li>
      <li>Coordinated PCB/PCBA production planning based on forecasts and inventory levels.</li>
      <li>Maintained BOM(Bill of Materials) and monitored key components (e.g., SSD, RAM) for compatibility and
availability.</li>
    </ul>
    <p className="lead">
    <strong>Manager Assistant – Sunkind (Aug of 2015–Sep of 2017, Taipei)</strong>
    Tracked and managed all project progress and coordination for IT infrastructure construction.</p>
  
</div>

      {/* Skills */}
<div className="resume-section">
  <h2 className="h2">Core Skills</h2>

  {SKILL_GROUPS.map((group, i) => (
    <div key={i} style={{ marginBottom: "2.5rem" }}>
      <h3 className="h3" style={{ fontSize: "18px", marginBottom: "1rem", color: "var(--primary)" }}>
        {group.category}
      </h3>
      <div className="grid-3">
        {group.skills.map((s, j) => (
          <div key={j} className="card-glass">
            {s.icon && <s.icon size={20} style={{ marginBottom: 8 }} />}
            <div className="card-title">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
      {/* Cloud Architecture Diagram */}
<div className="resume-section">
  <h2 className="h2">Cloud Architecture Diagram</h2>
  <img
    src="/cv/export.png"
    alt="Cloud Architecture"
    style={{ maxWidth: "100%", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
  />
</div>

{/* Key Projects */}
<div className="resume-section">
    <strong style={{ marginBottom: "0", display: "block" }}>
    Project 1: Cloud Resume Challenge
  </strong>
  <p className="lead">
    This live website showcases my full-stack cloud resume project. It features a React-based frontend and a Node.js backend, deployed using AWS services including Lambda (serverless), API Gateway (routing), DynamoDB (visitor counter), and Amplify.<br />
    <a href="https://github.com/hinait/cloud-resume-frontend" target="_blank" rel="noreferrer">Visit GitHub repo →</a>
  </p>
<strong style={{ marginBottom: "0", display: "block" }}>
    Project 2: Nutrition Tracking Website
  </strong>
  <p className="lead">
    Built a React.js UI and collaborated with a Python backend team to
query the USDA FoodData API; implemented search functionality with responsive, user-friendly results pages.<br />
    <a href="https://github.com/hinait/nutrition_website_frontend" target="_blank" rel="noreferrer">View GitHub repo →</a>
  </p>
<strong style={{ marginBottom: "0", display: "block" }}>
    Project 3: FileMaker Integration Intern Project (Nova IT)
  </strong>
    <p className="lead">
  Full-Stack Developer & PM Delivered a
React frontend and Node.js backend integrating the FileMaker database ; built the
Remittance page end-to-end and deployed on AWS Amplify (frontend) and EC2 + Nginx (backend). Worked in
Scrum with stakeholder and internal team.<br />
    <a href="https://github.com/A2025Y/nova-health-filemaker-integration" target="_blank" rel="noreferrer">View GitHub repo →</a>
  </p>
</div>

      {/* Certifications */}
      <div className="resume-section">
        <h2 className="h2">Certifications</h2>
  <div className="grid-3 cert-grid">
    {CERTS.map((c, i) => (
      <motion.div
        key={i}
        className="card-glass"
        style={{ cursor: "pointer", position: "relative" }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .4, delay: i * .05 }}
      >
        <div className="card-title">{c.name}</div>
        <div className="card-muted">{c.when}</div>
      
      </motion.div>
    ))}
  </div>
      </div>

      {/* Footer */}
      <footer className="footer">© {tYear} {PROFILE.name}. Built with React.  {visitorCount !== null && (
    <span style={{ marginLeft: "1rem", fontSize: "14px", color: "#888" }}>
      Visitor Count: {visitorCount}
    </span>
  )}</footer>
 
<ConfirmModal
  show={showResumeModal}
  certName="Hina's Resume"
  onConfirm={confirmResumeDownload}
  onCancel={cancelResumeDownload}
/>
    </div>
  );
}
