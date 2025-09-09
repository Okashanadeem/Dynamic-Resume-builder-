'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type Education = {
  degree: string;
  institution: string;
  period: string;
  details: string;
};

type Project = {
  title: string;
  link: string;
  summary: string;
};

type ResumeData = {
  // Personal
  name: string;
  email: string;
  contact: string;
  location: string;
  linkedin: string;
  github: string;
  upwork: string;
  portfolio: string;

  // Profile
  summary: string;

  // Experience
  experiences: Experience[];

  // Education
  education: Education[];

  // Technical Skills
  technicalSkills: string;
  toolsWorkflow: string;
  aiPromptEngineering: string;

  // Projects
  projects: Project[];

  // Certifications & Achievements
  certifications: string;
  achievements: string;

  // Languages
  languages: string;

  // Hobbies & Interests
  hobbies: string;
};

type SectionKey = 'experiences' | 'education' | 'projects';

export default function ExpandedResumeForm() {
  const [formData, setFormData] = useState<ResumeData>({
    name: '',
    email: '',
    contact: '',
    location: '',
    linkedin: '',
    github: '',
    upwork: '',
    portfolio: '',
    summary: '',
    experiences: [{ role: '', company: '', duration: '', description: '' }],
    education: [{ degree: '', institution: '', period: '', details: '' }],
    technicalSkills: '',
    toolsWorkflow: '',
    aiPromptEngineering: '',
    projects: [{ title: '', link: '', summary: '' }],
    certifications: '',
    achievements: '',
    languages: '',
    hobbies: '',
  });

  const router = useRouter();

  const handleChange = <
    T extends SectionKey,
    K extends keyof ResumeData[T][number]
  >(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section?: T,
    index?: number,
    field?: K
  ) => {
    if (section && typeof index === 'number' && field) {
      const list = [...formData[section]];
      list[index] = { ...list[index], [field]: e.target.value };
      setFormData({ ...formData, [section]: list });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value } as ResumeData);
    }
  };

  const addEntry = (section: SectionKey) => {
    const template: ResumeData[SectionKey][number] =
      section === 'experiences'
        ? { role: '', company: '', duration: '', description: '' }
        : section === 'education'
        ? { degree: '', institution: '', period: '', details: '' }
        : { title: '', link: '', summary: '' };

    setFormData({
      ...formData,
      [section]: [...formData[section], template],
    });
  };

  const handleView = () => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
    router.push('/resume-preview');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-12">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
          📝 Comprehensive Resume Builder
        </h2>
        <form className="space-y-8">
          {/* Personal & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Full Name', name: 'name', type: 'text' },
              { label: 'Email Address', name: 'email', type: 'email' },
              { label: 'Contact Number', name: 'contact', type: 'text' },
              { label: 'Location (City, Country)', name: 'location', type: 'text' },
              { label: 'LinkedIn URL', name: 'linkedin', type: 'url' },
              { label: 'GitHub URL', name: 'github', type: 'url' },
              { label: 'Upwork Profile', name: 'upwork', type: 'url' },
              { label: 'Portfolio URL', name: 'portfolio', type: 'url' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <textarea
              name="summary"
              rows={4}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Experiences Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Work Experience
            </h3>
            {formData.experiences.map((exp, idx) => (
              <div key={idx} className="space-y-3 mb-6">
                {[
                  { label: 'Role', field: 'role' },
                  { label: 'Company', field: 'company' },
                  { label: 'Duration', field: 'duration' },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      value={exp[field as keyof Experience]}
                      onChange={(e) =>
                        handleChange(e, 'experiences', idx, field as keyof Experience)
                      }
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                ))}
                <label className="block text-sm text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  rows={3}
                  onChange={(e) =>
                    handleChange(e, 'experiences', idx, 'description')
                  }
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry('experiences')}
              className="text-green-600 font-semibold"
            >
              + Add Experience
            </button>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Education</h3>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="space-y-3 mb-6">
                {[
                  { label: 'Degree/Program', field: 'degree' },
                  { label: 'Institution', field: 'institution' },
                  { label: 'Period', field: 'period' },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      value={edu[field as keyof Education]}
                      onChange={(e) =>
                        handleChange(e, 'education', idx, field as keyof Education)
                      }
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                ))}
                <label className="block text-sm text-gray-700 mb-1">
                  Details/Achievements
                </label>
                <textarea
                  value={edu.details}
                  rows={2}
                  onChange={(e) =>
                    handleChange(e, 'education', idx, 'details')
                  }
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry('education')}
              className="text-green-600 font-semibold"
            >
              + Add Education
            </button>
          </div>

          {/* Skills & Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technical Skills <span className="text-gray-500 text-sm">(comma separated)</span>
              </label>
              <input
                name="technicalSkills"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tools & Workflow <span className="text-gray-500 text-sm">(comma separated)</span>
              </label>
              <input
                name="toolsWorkflow"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI & Prompt Engineering <span className="text-gray-500 text-sm">(comma separated)</span>
              </label>
              <input
                name="aiPromptEngineering"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Selected Projects
            </h3>
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="space-y-3 mb-6">
                <label className="block text-sm text-gray-700 mb-1">Title</label>
                <input
                  value={proj.title}
                  onChange={(e) =>
                    handleChange(e, 'projects', idx, 'title')
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <label className="block text-sm text-gray-700 mb-1">Link</label>
                <input
                  value={proj.link}
                  onChange={(e) =>
                    handleChange(e, 'projects', idx, 'link')
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <label className="block text-sm text-gray-700 mb-1">Summary</label>
                <textarea
                  value={proj.summary}
                  rows={2}
                  onChange={(e) =>
                    handleChange(e, 'projects', idx, 'summary')
                  }
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry('projects')}
              className="text-green-600 font-semibold"
            >
              + Add Project
            </button>
          </div>

          {/* Certifications & Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certifications
              </label>
              <textarea
                name="certifications"
                rows={3}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievements & Awards
              </label>
              <textarea
                name="achievements"
                rows={3}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Languages & Hobbies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages <span className="text-gray-500 text-sm">(comma separated)</span>
              </label>
              <input
                name="languages"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hobbies & Interests
              </label>
              <textarea
                name="hobbies"
                rows={3}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={handleView}
              className="bg-green-600 text-white text-xl font-semibold px-12 py-5 rounded-2xl shadow-lg hover:bg-green-700 transition duration-200"
            >
              ✅ Generate & View Resume
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
