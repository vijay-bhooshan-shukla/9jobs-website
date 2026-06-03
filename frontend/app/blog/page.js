import Link from "next/link";
import { ArrowRight, BookOpen, BookUser, Briefcase, FileText, Search } from "lucide-react";

const posts = [
  [
    "How to Get a Job in Australia: The Definitive Guide",
    "A comprehensive, step-by-step guide to navigating the recruitment process, profile setups, and landing job offers in Australia.",
    "Job Search",
    Briefcase,
    "/blog/how-to-get-a-job-in-australia"
  ],
  [
    "Best ATS Resume Format for Australian Recruiters",
    "Learn how to format and optimize your resume to pass automated screens and align with local benchmarks.",
    "Resume",
    FileText,
    "/blog/ats-resume-format-australia"
  ],
  [
    "LinkedIn Optimization Guide for Job Seekers in Australia",
    "Unlock the power of LinkedIn Recruiter searches in Australia. Headline formulas, summaries, and settings adjustments.",
    "LinkedIn",
    BookUser,
    "/blog/linkedin-optimization-australia-guide"
  ],
  [
    "SEEK Profile Optimization: Top Sourcing Tips for Australia",
    "Make your SEEK profile stand out to recruiters. Settings, summaries, alerts, and formatting tips to maximize callbacks.",
    "SEEK",
    Search,
    "/blog/seek-profile-optimization-tips"
  ],
  [
    "Not Getting Job Interviews in Australia? Here is Why & How to Fix",
    "Discover the most common reasons why your applications are getting rejected and learn actionable steps to fix them.",
    "Job Search",
    FileText,
    "/blog/why-you-are-not-getting-job-interviews"
  ]
];

export const metadata = {
  title: "Blog | 9Jobs",
  description: "Career tips from 9Jobs for resumes, LinkedIn profiles, interviews, and smarter applications.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="site-main fj-page">
      <section className="fj-page-hero">
        <div className="fj-container">
          <span className="fj-announcement"><span>Blog</span> Career notes that stay practical</span>
          <h1>Small improvements that make applications <span className="heading-mark">stronger.</span></h1>
          <p>Clean advice for resumes, LinkedIn, interviews, targeting, and the habits that keep a job search moving.</p>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-card-grid fj-card-grid--three">
          {posts.map(([title, text, tag, Icon, href]) => (
            <article className="fj-blog-card" key={title}>
              <div className="fj-icon-chip"><Icon size={22} /></div>
              <span className="fj-badge">{tag}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link href={href}>Read Article <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <BookOpen size={28} />
          <h2>Want help applying the <span className="heading-mark">advice?</span></h2>
          <p>Send your goals to 9Jobs and we will help shape a practical next step.</p>
          <Link className="fj-button fj-button--dark" href="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
