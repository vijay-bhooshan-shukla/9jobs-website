import mongoose from 'mongoose';

const InterviewFeedbackSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, default: '' },
  candidateName: { type: String, required: true },
  jobRole: { type: String, required: true },
  interviewDate: { type: String, required: true },
  interviewRound: { type: String, required: true },
  suitable: { type: String, required: true },
  commRating: { type: String, required: true },
  skillsRating: { type: String, required: true },
  profRating: { type: String, required: true },
  overallRating: { type: String, required: true },
  sendMore: { type: String, required: true },
  status: { type: String, required: true },
  candidateFeedback: { type: String, default: '' },
  recruiterFeedback: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.InterviewFeedback || mongoose.model('InterviewFeedback', InterviewFeedbackSchema);
