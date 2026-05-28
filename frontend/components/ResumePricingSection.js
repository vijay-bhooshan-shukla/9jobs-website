"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, FileCheck, Zap, RotateCw, PenTool, Sparkles } from "lucide-react";
import { CalendlyLink } from "./CalendlyWidget";
import PricingCheckoutButton from "./PricingCheckoutButton";
import { spring } from "../utils/animations";

const resumePlans = [
  {
    name: "Resume Makeover",
    price: "$69",
    period: "one-time",
    summary: "Professional resume redesign tailored for ATS systems to get you noticed.",
    items: [
      "Resume redesign",
      "ATS-friendly formatting",
      "Grammar & formatting fixes",
      "Industry-specific improvements",
      "PDF delivery"
    ],
    initial: { opacity: 0, x: -70 },
    animate: { opacity: 1, x: 0 },
    delay: 0
  },
  {
    name: "Resume + LinkedIn Optimisation",
    badge: "Most Popular",
    price: "$99",
    period: "one-time",
    summary: "Transform both your resume and your LinkedIn profile for double the impact.",
    items: [
      "Resume makeover",
      "LinkedIn headline optimisation",
      "About section rewrite",
      "Experience enhancement",
      "ATS keyword optimisation"
    ],
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    delay: 0.12
  },
  {
    name: "Job Search Essentials",
    price: "$129",
    period: "one-time",
    summary: "Everything you need to optimize all primary job application channels.",
    items: [
      "Resume makeover",
      "LinkedIn optimisation",
      "SEEK profile optimisation",
      "ATS keyword targeting",
      "Application strategy guide"
    ],
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    delay: 0.24
  },
  {
    name: "Career Branding Bundle",
    dark: true,
    price: "$149",
    period: "one-time",
    summary: "The ultimate branding toolkit with priority access and bespoke templates.",
    items: [
      "Resume makeover",
      "LinkedIn optimisation",
      "SEEK profile optimisation",
      "ATS keyword targeting",
      "Cover letter template",
      "Priority review"
    ],
    initial: { opacity: 0, x: 70 },
    animate: { opacity: 1, x: 0 },
    delay: 0.36
  }
];

const trustItems = [
  { icon: FileCheck, label: "ATS-friendly" },
  { icon: Zap, label: "Fast turnaround" },
  { icon: RotateCw, label: "Unlimited revisions" },
  { icon: PenTool, label: "Human-written" }
];

export default function ResumePricingSection() {
  return (
    <section className="fj-section fj-resume-section">
      <div className="fj-container">
        {/* Section Heading & Subheading */}
        <motion.div 
          className="fj-section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="fj-announcement" style={{ margin: "0 auto 16px" }}>
            <span>One-Time Packages</span> Premium upgrades
          </span>
          <h2>
            Resume & <span className="heading-mark">Profile Optimization</span>
          </h2>
          <p>
            One-time professional upgrades for job seekers who don’t need weekly support.
          </p>
        </motion.div>

        {/* 4 Resume Service Cards Grid */}
        <div className="fj-card-grid fj-card-grid--four">
          {resumePlans.map((plan) => (
            <motion.article
              key={plan.name}
              className={`fj-pricing-card has-purple-accent ${plan.dark ? "is-dark" : ""}`}
              initial={plan.initial}
              whileInView={plan.animate}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
                delay: plan.delay
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: plan.dark 
                  ? "0 22px 50px rgba(124, 58, 237, 0.22)" 
                  : "0 22px 50px rgba(124, 58, 237, 0.09)",
                borderColor: plan.dark ? "#8b5cf6" : "#a78bfa"
              }}
            >
              {/* Badge */}
              {plan.badge && <span className="fj-badge is-purple">{plan.badge}</span>}

              <h2>{plan.name}</h2>
              <p>{plan.summary}</p>
              <strong>{plan.price}</strong>
              <span className="fj-price-period">{plan.period}</span>

              {/* Checklist Items */}
              <div className="fj-price-list">
                {plan.items.map((item, idx) => (
                  <motion.span
                    key={item}
                    className="has-purple-icon"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: plan.delay + 0.15 + idx * 0.06,
                      ease: "easeOut"
                    }}
                  >
                    <Check size={17} /> {item}
                  </motion.span>
                ))}
              </div>

              {/* Actions with lift + glow */}
              <div className="fj-pricing-actions" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                <PricingCheckoutButton
                  plan={plan}
                  className={`fj-button is-purple-glow ${plan.dark ? "fj-button--lime" : "fj-button"}`}
                />
                <CalendlyLink className="fj-button fj-button--ghost">
                  Get started <ArrowRight size={17} />
                </CalendlyLink>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Small Trust Strip */}
        <motion.div 
          className="fj-resume-trust-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="fj-resume-trust-item">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
