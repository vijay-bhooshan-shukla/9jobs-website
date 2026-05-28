"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ClientServiceFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const initialFormData = {
    companyName: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    hiringRole: "",
    subscriptionPlan: "",
    startDate: "",
    endDate: "",
    candidatesShared: "",
    interviewsArranged: "",
    candidatesSelected: "",
    candidatesHired: "",
    satisfactionScore: "",
    qualityRating: "",
    commRating: "",
    speedRating: "",
    valueRating: "",
    useAgain: "",
    recommend: "",
    likeMost: "",
    improve: "",
    testimonial: "",
    consent: false
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch('/api/client-service-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormData);
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Failed to submit feedback. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="site-main fj-page">
        <section className="fj-section">
          <div className="fj-container center" style={{ maxWidth: "600px", padding: "100px 20px" }}>
            <CheckCircle2 size={64} style={{ color: "var(--lime)", margin: "0 auto 24px" }} />
            <h1 className="page-title">Thank You!</h1>
            <p className="lead">Your feedback has been submitted successfully. We appreciate your partnership with 9Jobs.</p>
            <div style={{ marginTop: "32px" }}>
              <button onClick={() => setSubmitted(false)} className="fj-button fj-button--ghost" style={{ marginRight: "16px" }}>Submit Another</button>
              <Link href="/" className="fj-button fj-button--dark">Back to Home</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="site-main fj-page">
      <section className="fj-section">
        <div className="fj-container" style={{ maxWidth: "800px" }}>
          <div className="fj-section-head center">
            <h2>Client Service Experience <span className="heading-mark">Feedback</span></h2>
            <p>Help us improve by rating your overall hiring experience.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", background: "#fff", padding: "40px", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", boxShadow: "var(--soft-shadow)" }}>
            
            {errorMsg && (
              <div style={{ padding: "16px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertCircle size={20} /> {errorMsg}
              </div>
            )}

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Company Name *</label>
                <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Contact Person Name *</label>
                <input required type="text" name="contactName" value={formData.contactName} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Hiring Role *</label>
                <input required type="text" name="hiringRole" value={formData.hiringRole} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Subscription Plan *</label>
                <select required name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select plan</option>
                  <option value="Startups">Startups</option>
                  <option value="Mid-size">Mid-size</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Service Start Date *</label>
                <input required type="date" name="startDate" value={formData.startDate} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Service End Date *</label>
                <input required type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit" }} />
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidates Shared *</label>
                <input required type="number" min="0" name="candidatesShared" value={formData.candidatesShared} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Interviews Arranged *</label>
                <input required type="number" min="0" name="interviewsArranged" value={formData.interviewsArranged} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidates Selected *</label>
                <input required type="number" min="0" name="candidatesSelected" value={formData.candidatesSelected} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidates Hired *</label>
                <input required type="number" min="0" name="candidatesHired" value={formData.candidatesHired} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid var(--line)", margin: "8px 0" }} />

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Overall Satisfaction (1-5) *</label>
                <select required name="satisfactionScore" value={formData.satisfactionScore} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidate Quality Rating (1-5) *</label>
                <select required name="qualityRating" value={formData.qualityRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Recruiter Communication (1-5) *</label>
                <select required name="commRating" value={formData.commRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Hiring Speed Rating (1-5) *</label>
                <select required name="speedRating" value={formData.speedRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Value for Money (1-5) *</label>
                <select required name="valueRating" value={formData.valueRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Would you use 9Jobs again? *</label>
                <select required name="useAgain" value={formData.useAgain} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Would you recommend 9Jobs? *</label>
                <select required name="recommend" value={formData.recommend} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontWeight: "700" }}>What did you like most?</label>
              <textarea name="likeMost" rows="3" value={formData.likeMost} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit", resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontWeight: "700" }}>What can we improve?</label>
              <textarea name="improve" rows="3" value={formData.improve} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit", resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontWeight: "700" }}>Testimonial message</label>
              <textarea name="testimonial" rows="4" placeholder="If you had a great experience, please share a few words!" value={formData.testimonial} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit", resize: "vertical" }} />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", fontWeight: "600", fontSize: "0.95rem" }}>
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} style={{ width: "20px", height: "20px", accentColor: "var(--lime)" }} />
              I allow 9Jobs to display this feedback/testimonial on the website.
            </label>

            <button type="submit" disabled={loading} className="fj-button fj-button--dark" style={{ marginTop: "16px", alignSelf: "flex-start", cursor: loading ? "not-allowed" : "pointer", border: "none", fontFamily: "var(--font-heading)", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Submitting..." : "Submit Feedback"} {!loading && <ArrowRight size={18} style={{ marginLeft: "8px" }} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
