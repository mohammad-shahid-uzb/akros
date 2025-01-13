import React from "react";
import Footer from "../components/Layout/Footer";
import "../css/ProjectManagement.css"; // Import your CSS file here

const ProjectManagement = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //height: "50vh",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <h1>Project Management Features</h1>
        <p>
          In the fast-paced world of construction, effective project management
          is crucial for delivering projects on time and within budget. Our
          platform is equipped with advanced project management features
          designed to optimize every phase of your construction project, from
          planning to completion.
        </p>
      </div>

      {/* Planning & Scheduling - Half Screen */}
      <section className="halfScreenSection" style={halfScreenSectionStyle}>
        <img
          src="/planing.webp"
          alt="Planning & Scheduling"
          style={halfImageStyle}
        />
        <div style={contentStyle}>
          <h2>Planning & Scheduling</h2>
          <p>
            Planning and scheduling are two important steps in project
            development that allow managers to achieve a project's goals and
            deliver quality results. While the two share similarities, each
            serves an important, unique purpose in the project process.
            Understanding these concepts can help you better use each of them
            for more efficient and productive projects.
          </p>
          <p>
            The most important programs used in construction management are
            <strong> Primavera</strong> and <strong> Microsoft Project</strong>.
            These tools offer powerful scheduling, resource allocation, and
            progress tracking functionalities that help ensure your projects
            stay on track and within scope. Integrating these tools into your
            management workflow can significantly improve efficiency and project
            outcomes.
          </p>
        </div>
      </section>

      {/* Resource Allocation - Chequered */}
      <section className="chequeredSection" style={chequeredSectionStyle}>
        <div style={contentStyle}>
          <h2>Resource Allocation</h2>
          <p>
            Efficient resource allocation is a critical component of successful
            construction project management. Our platform provides powerful
            tools to help you assign the right resources to the right tasks,
            ensuring maximum productivity and avoiding costly delays.
          </p>

          <p>Key aspects of our resource allocation features include:</p>

          <ul>
            <li>
              <strong>Optimal manpower distribution:</strong> Easily assign and
              manage workforce resources based on skill sets, availability, and
              project needs, ensuring that every task is handled by the right
              people at the right time.
            </li>
            <li>
              <strong>Equipment & material allocation:</strong> Keep track of
              all equipment and materials, ensuring they are available when
              needed. This helps avoid downtime and over-ordering, ultimately
              saving costs and improving efficiency.
            </li>
            <li>
              <strong>Real-time adjustments:</strong> Make instant adjustments
              to resource assignments as project conditions evolve. If delays or
              changes occur, quickly reallocate resources to keep the project on
              track.
            </li>
            <li>
              <strong>Cost efficiency:</strong> Monitor the usage of resources
              and ensure they are used within budgetary constraints. Our
              platform allows you to analyze resource utilization and make
              informed decisions to optimize cost-efficiency.
            </li>
          </ul>
        </div>
        <img
          src="/Resource.webp"
          alt="Resource Allocation"
          style={halfImageStyle}
        />
      </section>

      {/* Risk Management - Full Screen */}
      <section className="fullScreenSection" style={fullScreenSectionStyle}>
        <img src="/Risk.webp" alt="Risk Management" style={fullImageStyle} />
        <div className="overlayContent" style={overlayContentStyle}>
          <h2>Risk Management</h2>
          <p>
            Identify potential risks and implement mitigation strategies to
            avoid project delays.
          </p>
        </div>
      </section>

      {/* Combined Section - Chequered */}
      <section className="chequeredSection" style={chequeredSectionStyle}>
        <img
          src="/Reporting.webp"
          alt="Budget Management, Collaboration Tools & Reporting"
          style={halfImageStyle}
        />
        <div style={contentStyle}>
          <h2>Budget Management, Collaboration Tools & Reporting</h2>
          <p>
            Efficient resource allocation is a critical component of successful
            construction project management. Our platform provides powerful
            tools to help you assign the right resources to the right tasks,
            ensuring maximum productivity and avoiding costly delays.
          </p>
          <p>Key aspects of our resource allocation features include:</p>
          <ul>
            <li>
              <strong>Optimal manpower distribution:</strong> Easily assign and
              manage workforce resources based on skill sets, availability, and
              project needs.
            </li>
            <li>
              <strong>Equipment & material allocation:</strong> Keep track of
              all equipment and materials, ensuring they are available when
              needed.
            </li>
            <li>
              <strong>Real-time adjustments:</strong> Make instant adjustments
              to resource assignments as project conditions evolve. If delays or
              changes occur, quickly reallocate resources to keep the project on
              track.
            </li>
            <li>
              <strong>Cost efficiency:</strong> Monitor the usage of resources
              and ensure they are used within budgetary constraints. Our
              platform allows you to analyze resource utilization and make
              informed decisions to optimize cost-efficiency.
            </li>
          </ul>
        </div>
      </section>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <blockquote style={{ fontStyle: "italic", fontSize: "1.5rem" }}>
          "We don’t just build structures; we shape the future of our world."
        </blockquote>
      </div>
      <Footer />
    </div>
  );
};

// Styling for sections and images
const halfScreenSectionStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  alignItems: "center",
  marginBottom: "40px",
  padding: "10px",
  textAlign: "center",
};

const fullScreenSectionStyle = {
  position: "relative",
  width: "100%",
  height: "400px",
  marginBottom: "40px",
};

const chequeredSectionStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  alignItems: "center",
  marginBottom: "40px",
};

const contentStyle = {
  padding: "20px",
  textAlign: "justify",
};

const overlayContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  textAlign: "center",
  background: "rgba(0, 0, 0, 0.5)",
  padding: "20px",
};

const halfImageStyle = {
  width: "100%",
  height: "auto",
};

const fullImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export default ProjectManagement;
