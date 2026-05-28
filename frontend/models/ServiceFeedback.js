import mongoose from 'mongoose';

const ServiceFeedbackSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, default: '' },
  hiringRole: { type: String, required: true },
  subscriptionPlan: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  candidatesShared: { type: String, required: true },
  interviewsArranged: { type: String, required: true },
  candidatesSelected: { type: String, required: true },
  candidatesHired: { type: String, required: true },
  satisfactionScore: { type: String, required: true },
  qualityRating: { type: String, required: true },
  commRating: { type: String, required: true },
  speedRating: { type: String, required: true },
  valueRating: { type: String, required: true },
  useAgain: { type: String, required: true },
  recommend: { type: String, required: true },
  likeMost: { type: String, default: '' },
  improve: { type: String, default: '' },
  testimonial: { type: String, default: '' },
  consent: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.ServiceFeedback || mongoose.model('ServiceFeedback', ServiceFeedbackSchema);
