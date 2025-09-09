'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

type ResumeData = {
  name: string;
  email: string;
  contact: string;
  location: string;
  linkedin: string;
  github: string;
  upwork: string;
  portfolio: string;
  summary: string;
  experiences: { role: string; company: string; duration: string; description: string }[];
  education: { degree: string; institution: string; period: string; details: string }[];
  technicalSkills: string;
  toolsWorkflow: string;
  aiPromptEngineering: string;
  projects: { title: string; link: string; summary: string }[];
  certifications: string;
  achievements: string;
  languages: string;
  hobbies: string;
};

export default function ResumePreview() {
  const [data, setData] = useState<ResumeData | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('resumeData');
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) {
    return <p className="p-10 text-center text-gray-600">Loading Resume...</p>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print stylesheet */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-print-area, #resume-print-area * {
            visibility: visible;
          }
          #resume-print-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Controls bar */}
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-6 no-print">
          <button onClick={() => router.back()} className="text-gray-600 hover:underline">
            ← Back
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Print / Save to PDF
          </button>
        </div>

        {/* Resume content */}
        <div
          id="resume-print-area"
          ref={resumeRef}
          className="max-w-6xl mx-auto bg-white shadow-lg p-8 font-serif leading-relaxed"
        >
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl text-gray-800 font-bold">{data.name}</h1>
            <div className="text-sm text-gray-700 mt-2 flex justify-center gap-4">
              <p>{data.email}</p>
              <p>|</p>
              <p>{data.contact}</p>
              <p>|</p>
              <p>{data.location}</p>
            </div>
            
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column (smaller, 1/4 width) */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Online Links */}
              <div>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">Online</h2>
                <ul className="space-y-1 text-sm text-gray-600">
                  {data.linkedin && (
                    <li>
                      <strong>LinkedIn:</strong>{' '}
                      <a
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {data.linkedin}
                      </a>
                    </li>
                  )}
                  {data.github && (
                    <li>
                      <strong>GitHub:</strong>{' '}
                      <a
                        href={data.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {data.github}
                      </a>
                    </li>
                  )}
                  {data.upwork && (
                    <li>
                      <strong>Upwork:</strong>{' '}
                      <a
                        href={data.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {data.upwork}
                      </a>
                    </li>
                  )}
                  {data.portfolio && (
                    <li>
                      <strong>Portfolio:</strong>{' '}
                      <a
                        href={data.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {data.portfolio}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                  Technical Skills
                </h2>
                <p className="text-sm whitespace-pre-line text-gray-600">{data.technicalSkills}</p>
              </div>

              {/* Tools & Workflow */}
              <div>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                  Tools & Workflow
                </h2>
                <p className="text-sm whitespace-pre-line text-gray-600">{data.toolsWorkflow}</p>
              </div>

              {/* AI & Prompt Engineering */}
              <div>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                  AI & Prompt Engineering
                </h2>
                <p className="text-sm whitespace-pre-line text-gray-600">{data.aiPromptEngineering}</p>
              </div>
            </aside>

            {/* Right Column (larger, 3/4 width) */}
            <main className="lg:col-span-3 space-y-8">
              {/* Summary */}
              <section>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm whitespace-pre-line text-gray-600">{data.summary}</p>
              </section>

              {/* Experience */}
              <section>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-4">
                  Work Experience
                </h2>
                {data.experiences.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.role} @ {exp.company}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{exp.duration}</p>
                    <p className="text-sm whitespace-pre-line text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </section>

              {/* Education */}
              <section>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-4">Education</h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree}, {edu.institution}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{edu.period}</p>
                    <p className="text-sm whitespace-pre-line text-gray-600">{edu.details}</p>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section>
                <h2 className="uppercase text-sm font-semibold text-gray-800 mb-4">
                  Selected Projects
                </h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{proj.title}</h3>
                    {proj.link && (
                      <p className="text-sm underline mb-1">
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                          {proj.link}
                        </a>
                      </p>
                    )}
                    <p className="text-sm whitespace-pre-line text-gray-600">{proj.summary}</p>
                  </div>
                ))}
              </section>

              {/* Certifications & Achievements */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                    Certifications
                  </h2>
                  <p className="text-sm whitespace-pre-line text-gray-600">{data.certifications}</p>
                </div>
                <div>
                  <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                    Achievements & Awards
                  </h2>
                  <p className="text-sm whitespace-pre-line text-gray-600">{data.achievements}</p>
                </div>
              </section>

              {/* Languages & Hobbies */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">Languages</h2>
                  <p className="text-sm whitespace-pre-line text-gray-600">{data.languages}</p>
                </div>
                <div>
                  <h2 className="uppercase text-sm font-semibold text-gray-800 mb-2">
                    Hobbies & Interests
                  </h2>
                  <p className="text-sm whitespace-pre-line text-gray-600">{data.hobbies}</p>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}