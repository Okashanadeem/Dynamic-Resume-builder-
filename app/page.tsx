import Link from "next/link";
import { Sparkles, Eye, Download } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900 px-6 py-16">
      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Build Your Resume <span className="text-blue-600">Effortlessly</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Our dynamic and intuitive Resume Builder helps you create beautiful,
          ATS-optimized resumes tailored to your career goals.
        </p>
        <Link href="/resume-form">
          <button className="bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200">
            🚀 Start Building Your Resume
          </button>
        </Link>
      </section>

      {/* FEATURE SECTION */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <Sparkles className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
          <p className="text-gray-600 text-sm">
            Simple, guided input forms with real-time preview. No design skills
            required!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <Eye className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
          <p className="text-gray-600 text-sm">
            View your resume as you build it — what you see is what you get.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <Download className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Download Instantly</h3>
          <p className="text-gray-600 text-sm">
            Export your resume as a PDF in one click — optimized for recruiters
            and job platforms.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="mt-28 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-gray-600 mb-6">
          Start crafting your professional resume now — it’s fast, free, and
          effective.
        </p>
        <Link href="/resume-form">
          <button className="bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200">
            Start Now
          </button>
        </Link>
      </section>
    </main>
  );
}
