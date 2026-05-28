"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function InterviewFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const initialFormData = {
    companyName: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    candidateName: "",
    jobRole: "",
    interviewDate: "",
    interviewRound: "",
    suitable: "",
    commRating: "",
    skillsRating: "",
    profRating: "",
    overallRating: "",
    sendMore: "",
    status: "",
    candidateFeedback: "",
    recruiterFeedback: ""
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch('/api/interview-feedback', {
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
            <h1 className="page-title">Feedback Submitted</h1>
            <p className="lead">Thank you! Your feedback has been submitted successfully and helps us find the best talent for you.</p>
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
            <h2>Interview Experience <span className="heading-mark">Feedback</span></h2>
            <p>Please share your thoughts on the recent candidate interview.</p>
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
                <label style={{ fontWeight: "700" }}>Candidate Name *</label>
                <input required type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Job Role *</label>
                <input required type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Interview Date *</label>
                <input required type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Interview Round *</label>
                <input required type="text" name="interviewRound" placeholder="e.g. Technical Round 1" value={formData.interviewRound} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontWeight: "700" }}>Was the candidate suitable? *</label>
              <select required name="suitable" value={formData.suitable} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidate communication (1-5) *</label>
                <select required name="commRating" value={formData.commRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} - {v===5?'Excellent':v===1?'Poor':''}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidate skills rating (1-5) *</label>
                <select required name="skillsRating" value={formData.skillsRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidate professionalism (1-5) *</label>
                <select required name="profRating" value={formData.profRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Overall interview experience (1-5) *</label>
                <select required name="overallRating" value={formData.overallRating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select rating</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Should 9Jobs send more candidates like this? *</label>
                <select required name="sendMore" value={formData.sendMore} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: "700" }}>Candidate Status *</label>
                <select required name="status" value={formData.status} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff" }}>
                  <option value="">Select status</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hold">Hold</option>
                  <option value="Selected for next round">Selected for next round</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontWeight: "700" }}>Feedback for candidate</label>
              <textarea name="candidateFeedback" rows="3" value={formData.candidateFeedback} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit", resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontWeight: "700" }}>Feedback for 9Jobs recruiter</label>
              <textarea name="recruiterFeedback" rows="3" value={formData.recruiterFeedback} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit", resize: "vertical" }} />
            </div>

            <button type="submit" disabled={loading} className="fj-button fj-button--dark" style={{ marginTop: "16px", alignSelf: "flex-start", cursor: loading ? "not-allowed" : "pointer", border: "none", fontFamily: "var(--font-heading)", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Submitting..." : "Submit Feedback"} {!loading && <ArrowRight size={18} style={{ marginLeft: "8px" }} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
