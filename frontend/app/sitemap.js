import { pagesConfig } from "../data/australianJobsData";

export default function sitemap() {
  const baseUrl = "https://9jobs.co";

  // Main Pages
  const mainPages = ["", "/about", "/pricing", "/contact", "/blog", "/feature", "/features"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : (path === "/pricing" || path === "/blog") ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : (path === "/pricing" || path === "/blog") ? 0.9 : 0.8,
  }));

  // Service Pages
  const servicePages = [
    "/resume-writing-services-australia",
    "/linkedin-optimization-australia",
    "/seek-profile-optimization",
    "/job-application-services-australia",
    "/interview-support-australia"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Blog Pages
  const blogPages = [
    "/blog/how-to-get-a-job-in-australia",
    "/blog/ats-resume-format-australia",
    "/blog/linkedin-optimization-australia-guide",
    "/blog/seek-profile-optimization-tips",
    "/blog/why-you-are-not-getting-job-interviews"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Australian City Landing Pages
  const cityPages = pagesConfig.map((p) => {
    const path = p.slug ? `/${p.city}/${p.slug}` : `/${p.city}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: p.slug ? "weekly" : "daily",
      priority: p.slug ? 0.8 : 0.9,
    };
  });

  return [...mainPages, ...servicePages, ...blogPages, ...cityPages];
}
