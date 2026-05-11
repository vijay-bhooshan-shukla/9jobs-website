import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Danielle Rodrigues",
    role: "HR lead",
    quote: "9Jobs made the whole application process easier to understand and easier to manage.",
    image: "/framer/portrait-01.jpg"
  },
  {
    name: "David Wilson",
    role: "Founder",
    quote: "The clean workflow keeps candidates focused on the next meaningful action.",
    image: "/framer/portrait-02.jpg"
  },
  {
    name: "Dennis Howell",
    role: "Software candidate",
    quote: "My resume and LinkedIn profile felt sharper before the first application went out.",
    image: "/framer/portrait-03.jpg"
  },
];

export default function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="fj-section" style={{ overflow: "hidden" }}>
      <div className="fj-container">
        <div className="fj-section-head" style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="fj-label" style={{ display: "block", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px", color: "var(--fj-muted)" }}>Testimonials</span>
          <h2 style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)", fontWeight: 800, margin: 0, color: "var(--fj-ink)" }}>
            What people are <span className="heading-mark">saying.</span>
          </h2>
        </div>
        
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {duplicatedTestimonials.map((testimonial, idx) => (
              <article className="fj-feature-card" key={`${testimonial.name}-${idx}`} style={{ width: "400px", flexShrink: 0, padding: "32px", display: "flex", flexDirection: "column", background: "#fff", border: "1px solid var(--fj-line)" }}>
                <div style={{ marginBottom: "24px" }}>
                  <Quote size={32} color="var(--fj-line)" strokeWidth={1.5} style={{ fill: "var(--fj-soft)", marginBottom: "16px" }} />
                  <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--fj-muted)", lineHeight: 1.7, margin: 0, textAlign: "left" }}>
                    {testimonial.quote}
                  </p>
                </div>
                
                <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid var(--fj-line)", display: "flex", alignItems: "center", gap: 14 }}>
                  <Image src={testimonial.image} alt={testimonial.name} width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                    <strong style={{ fontSize: "0.95rem", color: "var(--fj-ink)", fontWeight: 700 }}>{testimonial.name}</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--fj-muted)" }}>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .marquee-wrapper {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 10px 0;
          }
          .marquee-wrapper::before,
          .marquee-wrapper::after {
            content: "";
            position: absolute;
            top: 0;
            width: 150px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .marquee-wrapper::before {
            left: 0;
            background: linear-gradient(to right, var(--background), transparent);
          }
          .marquee-wrapper::after {
            right: 0;
            background: linear-gradient(to left, var(--background), transparent);
          }
          .marquee-track {
            display: flex;
            gap: 32px;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 16px)); }
          }
        `}</style>
      </div>
    </section>
  );
}
