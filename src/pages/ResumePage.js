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
    category: "Project & Team",
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
  { name: "AWS Certified Cloud Practitioner", when: "2025", pdf: "/certs/AWS Certified Cloud Practitioner Certificate" },
  { name: "Certified Tester Foundation Level (ISTQB)", when: "2024",pdf: "/certs/ISTQB Certification-2024.pdf" },
  { name: "Scrum Master", when: "2024",pdf: "/certs/Professional Scrum Master I-2024.pdf" },
  { name: "IELTS 6.5", when: "2023",pdf: "/certs/IELTS transcript-2023.pdf" },
];

const PROJECTS = [
  {
    name: "Cloud Resume Challenge",
    blurb: "Inspired by cloud challenge and Built a React frontend and Node.js backend. Deployed with API Gateway, Lambda, implemented a simple analytics counter, and hosted on a personal domain.",
    href: "#",
    tags: ["API Gateway", "Lambda", "DynamoDB", "React"],
  },
  {
    name: "Nutrition App (RN + Node + MySQL)",
    blurb: "Daily meals & weight tracking; Node/Express backend on EC2; Nginx reverse proxy; HTTPS.",
    href: "#",
    tags: ["React Native", "Node", "EC2", "MySQL"],
  },
  {
    name: "Nova Health Internship Portal",
    blurb: "React + Node + FileMaker Data API; Amplify hosting; Windows EC2 reverse proxy; dashboards.",
    href: "#",
    tags: ["React", "FileMaker", "Amplify", "EC2"],
  },
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
          <button className="btn-primary" onClick={onConfirm}>Yes</button>
          <button className="btn" onClick={onCancel}>Cancel</button>
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
  
  const [showModal, setShowModal] = React.useState(false);
const [selectedCert, setSelectedCert] = React.useState(null);

const [visitorCount, setVisitorCount] = React.useState(null);

useEffect(() => {
  fetch("https://rudet6yugb.execute-api.us-east-1.amazonaws.com/dev/getVisitorCount")
    .then((res) => res.json())
    .then((data) => setVisitorCount(data.count))
    .catch((err) => console.error("Fetch error:", err));
}, []);


const handleDownloadClick = (cert) => {
  setSelectedCert(cert);
  setShowModal(true);
};

const confirmDownload = () => {
  if (selectedCert?.pdf) {
    window.open(selectedCert.pdf, "_blank");
  }
  setShowModal(false);
};

const cancelDownload = () => {
  setShowModal(false);
  setSelectedCert(null);
};

const [showResumeModal, setShowResumeModal] = React.useState(false);

const handleResumeClick = () => {
  setShowResumeModal(true);
};

const confirmResumeDownload = () => {
  window.open("/cv/HINA_CV.pdf", "_blank");
  setShowResumeModal(false);
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
{/* Hero */}
<div className="resume-hero">
  <div style={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    flexWrap: "wrap", 
    gap: 24, 
    maxWidth: 1100, 
     margin: "0 auto",          
    padding: "0 20px",
  }}>
    {/* 左側：文字 */}
    <div style={{ flex: 1, minWidth: "280px", textAlign: "left" }}>
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
    I’m a Project Manager with over seven years of experience leadinglarge-scale hardware and IoT projects.<br />
    I’m now expanding intosoftware and cloud development, having recently earned my Masterof Information Technology in New Zealand.<br />
    My background spans managing global ODM teams in hardwaremanufacturing, including laptops, IoT devices, and industrial PCs.<br /><br />
    During my internship at Nova IT, I also led full-stack developmentprojects, working with React, Node.js, and AWS.
    
    I bridge communication between clients, engineers, andstakeholders to ensure that technical outcomes align with business goals.
    With experience in both Waterfall and Scrum, I’m passionate about leading projects that deliver meaningful results.<br />
  </p>
</div>

{/* Work Experience */}
<div className="resume-section">
  <h2 className="h2">Work Experience</h2>
  <p className="lead">
    <strong>Full-Stack Developer & Project Manager – Nova IT Internship(July of 2025- Oct of 2025, New Zealand)</strong>
   Served as a Full-Stack Developer and Project Manager during a three-monthinternship, contributing to the development and deployment of a FileMaker-integrated web application that improved Nova IT’s internal operations whilecollaborating with multicultural teams across China, India, and Australia.
   <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Developed frontend pages with React.js and backend APIs with Node.js,integrating with the company’s FileMaker database to enable data search, edit,and export functions.</li>
      <li>Deployed both frontend and backend to the cloud. Frontend on AWS Amplify,backend on EC2, and configured Nginx and custom domain settings for production environment.</li>
      <li>Software Project Management: Analyzed client requirements, tracked deliverables, distributed tasks, and coordinated testers and developers;prepared project documents and progress reports; facilitated stakeholdermeetings.</li>
    </ul>
    <strong>Senior Project Manager – CLEVO(Oct of 2010–Sep of 2023, Taipei)</strong>
    Senior Project Manager for standard and ODM laptop programs (incl. EPSON), orchestrating 25+ cross-functional teams from RFQ to MP to hit schedule, quality, and cost targets.
   <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Led both standard and ODM laptop projects, including ODM projects forEPSON, managing the full lifecycle from RFQ to mass production.</li>
      <li>Coordinated project planning, feasibility reviews, and deliverables withinternal and client teamsCross.</li>
      <li>Managed cross-functional teams of 25+ across hardware, software,mechanical design, manufacturing, and supply chain•.</li>
      <li>Conducted kick-off and gate meetings to align scope, timeline, andresponsibilities.</li>
    </ul>
    <strong>Project Manager – VIVOTEK (July of 2019–Sep of 2020, Taipei)</strong>
    Led smart home initiatives at IoT, radar, and 5G-enabled camera solutions from concept to prototype with Agile delivery.
       <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Directed Agile projects to explore opportunities in the smart home market,focusing on IoT, radar, and 5G-enabled camera solutions.</li>
      <li>Managed development schedules and resolved issues across hardware,firmware, mechanical, and software teams, as well as external vendors.</li>
      <li>Led project planning, Scrum meetings, prototype validation, and issuetracking to ensure timely development and testing.</li>
    </ul>
     <strong>Assistant Project Manager – CASWELL (April of 2017–July of 2019, Taipei)</strong>
    Supported end-to-end lifecycle management for a 78+ product networking/firewall portfolio, coordinating NPI and production planning to keep launches on schedule and within budget.
       <ul style={{ marginTop: "0.6rem", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
      <li>Oversaw the lifecycle of 78+ networking and firewall products, including issueresolution, quality assurance, and material substitutions.</li>
      <li>Managed BOMs and monitored key components (e.g., SSD, RAM) forcompatibility and availability.</li>
      <li>Coordinated production for PCB/PCBA lines, aligning inventory with salesforecasts and ensuring timely procurement under budget constraints.</li>
      <li>Led production planning across EVT, DVT, and PVT stages for 14+ newproduct launches.</li>
      <li>Supported NPI (New Product Introduction) for standard products, leading planning, bug reviews, and cross-functional issue resolution.</li>
      <li>Managed product pricing and quotations for B2B markets.</li>
    </ul>
    <strong>Manager Assistant – Sunkind (July of 2015–Sep of 2017, Taipei)</strong>
    Assisted in managing administrative tasks, preparing quotations, andcoordinating project schedules to ensure timely deliverables.
  </p>
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

      {/* Projects */}
      <div className="resume-section">
        <h2 className="h2">Projects</h2>
        <div className="grid-3">
          {PROJECTS.map((p, i) => (
            <motion.a key={i} href={p.href} className="card-glass"
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: .4, delay: i * .05 }}>
              <div className="card-title">
  <span style={{ textDecoration: "underline" }}>{p.name}</span>
</div>
              <div className="card-muted">{p.blurb}</div>
              <div className="chips">{p.tags.map((t, j) => <Chip key={j}>{t}</Chip>)}</div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="resume-section">
        <h2 className="h2">Certifications</h2>
  <div className="grid-3">
    {CERTS.map((c, i) => (
      <motion.div
        key={i}
        className="card-glass"
        onClick={() => handleDownloadClick(c)}
        style={{ cursor: "pointer", position: "relative" }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .4, delay: i * .05 }}
        title="Click to download"
      >
        <div className="card-title">{c.name}</div>
        <div className="card-muted">{c.when}</div>
        <Download size={14} style={{ position: "absolute", bottom: 12, right: 12, color: "#888" }} />
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
  show={showModal}
  certName={selectedCert?.name}
  onConfirm={confirmDownload}
  onCancel={cancelDownload}
/>
<ConfirmModal
  show={showResumeModal}
  certName="Hina's Resume"
  onConfirm={confirmResumeDownload}
  onCancel={cancelResumeDownload}
/>
    </div>
  );
}
