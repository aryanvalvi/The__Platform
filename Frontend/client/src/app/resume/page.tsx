"use client"
import React, {useRef, useEffect, useState} from "react"

// Main page component
const page = () => {
  const resumeContentRef = useRef(null)
  const [libsLoaded, setLibsLoaded] = useState(false) // State to track if libraries are loaded

  useEffect(() => {
    // Function to dynamically load a script
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve() // Script already exists
          return
        }
        const script = document.createElement("script")
        script.src = src
        script.id = id
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    // Load jsPDF and html2canvas sequentially
    const loadLibraries = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
          "jspdf-script"
        )
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
          "html2canvas-script"
        )
        setLibsLoaded(true) // Set state to true once both are loaded
      } catch (error) {
        console.error("Failed to load PDF generation libraries:", error)
        // You might want to show an error message to the user here
      }
    }

    loadLibraries()
  }, []) // Empty dependency array means this runs once on mount

  // Function to handle PDF download
  const handleDownloadPdf = async () => {
    if (!libsLoaded) {
      console.error(
        "PDF generation libraries are still loading or failed to load."
      )
      return
    }

    const {jsPDF} = window.jspdf
    const doc = new jsPDF("p", "pt", "a4")
    const content = resumeContentRef.current

    if (!content) {
      console.error("Resume content not found for PDF generation.")
      return
    }

    try {
      const canvas = await window.html2canvas(content, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY,
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 595.28 // A4 width in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      doc.save("Aryan_Valvi_Resume.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-3 box-border">
      <div
        ref={resumeContentRef}
        className="resume-container bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full leading-tight text-gray-800"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
          Aryan Valvi
        </h1>
        <h3 className="text-base font-semibold text-gray-700 mb-4 text-center">
          Full Stack Developer
        </h3>

        <div className="contact-info flex flex-wrap justify-center gap-3 mb-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-blue-500"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V6h16v14zM4 4h16v1H4zM12 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
            7045055721
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-blue-500"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            aryanvalvi323@gmail.com
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-blue-500"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2h1zm3-1.93V14c0-1.1-.9-2-2-2h-4V8h5c1.1 0 2 .9 2 2v4.07c3.45-.63 6-3.89 6-7.94 0-1.01-.16-1.98-.45-2.9L14 16z" />
            </svg>
            <a
              href="https://github.com/aryanvalvi"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-blue-500"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5H16V12c0-1.24-.68-1.89-1.54-1.89-.78 0-1.12.52-1.12 1.28V18.5H11V12s-.06-3.37 1.5-4.13c1.56-.76 3.5-.18 3.5 2.45V18.5zM7.5 9.5c.83 0 1.5-.67 1.5-1.5S8.33 6.5 7.5 6.5 6 7.17 6 8s.67 1.5 1.5 1.5zm1.5 9H6V11h3v7.5z" />
            </svg>
            <a
              href="https://www.linkedin.com/in/aryan-valvi-42822024b/"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-blue-500"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            Mumbai, India
          </span>
        </div>

        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-500 pb-1 mt-4 mb-3">
          🌟 SUMMARY
        </h2>
        <p className="text-xs mb-3">
          Highly motivated{" "}
          <strong className="font-semibold">Full Stack Developer</strong> with a
          strong command of{" "}
          <strong className="font-semibold">MERN stack technologies</strong>,
          specializing in building{" "}
          <strong className="font-semibold">scalable web applications</strong>{" "}
          and{" "}
          <strong className="font-semibold">
            crafting intuitive, user-friendly interfaces
          </strong>
          . Passionate about{" "}
          <strong className="font-semibold">UI/UX design</strong> and committed
          to transforming innovative ideas into smooth, functional products.
          Proven ability to thrive in team environments and deliver robust
          solutions from concept to deployment.
        </p>

        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-500 pb-1 mt-4 mb-3">
          🎓 EDUCATION
        </h2>
        <p className="text-xs mb-3">
          <strong className="font-semibold">B.E in Computer Engineering</strong>
          <br />
          Atharva College Of Engineering, Malad, Mumbai, India
          <br />
          <em className="text-gray-600">August 2021 – May 2025</em>
          <br />
          <strong className="font-semibold">GPA:</strong> 8.17/10
        </p>

        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-500 pb-1 mt-4 mb-3">
          💻 SKILLS
        </h2>
        <ul className="list-disc ml-4 text-xs mb-3">
          <li className="mb-0.5">
            <strong className="font-semibold">Front-End:</strong> JavaScript,
            React, Redux, Next.js, HTML5, CSS3
          </li>
          <li className="mb-0.5">
            <strong className="font-semibold">Programming Languages:</strong>{" "}
            JavaScript, Java
          </li>
          <li className="mb-0.5">
            <strong className="font-semibold">Back-End:</strong> Node.js,
            Express.js, MongoDB, RESTful APIs, Elasticsearch
          </li>
          <li className="mb-0.5">
            <strong className="font-semibold">Tools & Platforms:</strong> Git,
            Figma, Vercel, Netlify
          </li>
          <li className="mb-0.5">
            <strong className="font-semibold">Deployment:</strong> VPS, Nginx,
            VM
          </li>
        </ul>

        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-500 pb-1 mt-4 mb-3">
          🚀 PROJECTS
        </h2>

        <div className="project-item mb-4">
          <p className="project-title text-base font-semibold text-gray-800 mb-0.5">
            **UIUXYN (Design Portfolio Hub)**
          </p>
          <p className="project-link text-xs text-gray-600 mb-2">
            🌐{" "}
            <a
              href="http://www.uiuxyn.xyz"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              www.uiuxyn.xyz
            </a>
          </p>
          <p className="text-xs mb-1">
            <strong className="font-semibold">Tech Stack:</strong> Next.js
            (TypeScript), Node.js, Express.js, MongoDB, Cloudinary,
            Elasticsearch, NGINX, HTTPS
          </p>
          <ul className="list-disc ml-4 text-xs">
            <li className="mb-0.5">
              <strong className="font-semibold">Engineered</strong> a robust,
              full-stack{" "}
              <strong className="font-semibold">Design Portfolio Hub</strong>{" "}
              enabling designers and creatives to{" "}
              <strong className="font-semibold">
                showcase UI/UX designs, artwork, and videos
              </strong>
              .
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">
                Implemented secure authentication and authorization
              </strong>{" "}
              mechanisms to protect user data and content.
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">Optimized media uploads</strong>{" "}
              through{" "}
              <strong className="font-semibold">Cloudinary integration</strong>,
              ensuring efficient storage and delivery of diverse media types.
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">
                Developed a high-performance search functionality
              </strong>{" "}
              powered by{" "}
              <strong className="font-semibold">Elasticsearch</strong>,
              significantly improving content discoverability for users.
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">
                Managed self-hosted deployment
              </strong>{" "}
              on a <strong className="font-semibold">Private VPS</strong> with{" "}
              <strong className="font-semibold">NGINX</strong> and{" "}
              <strong className="font-semibold">HTTPS</strong>, ensuring
              reliability and secure access.
            </li>
          </ul>
        </div>

        <div className="project-item mb-4">
          <p className="project-title text-base font-semibold text-gray-800 mb-0.5">
            **SANTRA (Modern Hiring Platform)**
          </p>
          <p className="text-xs mb-1">
            <strong className="font-semibold">Tech Stack:</strong> MERN Stack
            (MongoDB, Express.js, React, Node.js), Elasticsearch
          </p>
          <ul className="list-disc ml-4 text-xs">
            <li className="mb-0.5">
              <strong className="font-semibold">Developed and deployed</strong>{" "}
              a{" "}
              <strong className="font-semibold">
                scalable MERN Stack job portal
              </strong>{" "}
              designed to{" "}
              <strong className="font-semibold">
                streamline the hiring process
              </strong>{" "}
              for job seekers and employers.
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">
                Integrated a comprehensive suite of features
              </strong>
              , including{" "}
              <strong className="font-semibold">
                dynamic job listings, an intuitive resume builder, and robust
                application tracking
              </strong>
              .
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">
                Implemented an Elasticsearch-powered search engine
              </strong>{" "}
              to deliver{" "}
              <strong className="font-semibold">
                fast, highly relevant job results
              </strong>
              , enhancing user experience.
            </li>
            <li className="mb-0.5">
              <strong className="font-semibold">
                Focused on a seamless and efficient user journey
              </strong>{" "}
              from application to hiring, leveraging a modern, responsive
              architecture.
            </li>
          </ul>
        </div>
      </div>

      <div className="download-button-container mt-4 text-center">
        <button
          onClick={handleDownloadPdf}
          className={`py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all duration-300 ease-in-out shadow-md transform ${
            libsLoaded
              ? "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!libsLoaded} // Disable button if libraries are not loaded
        >
          {libsLoaded ? "Download Resume as PDF" : "Loading PDF Libraries..."}
        </button>
      </div>
    </div>
  )
}

export default page
