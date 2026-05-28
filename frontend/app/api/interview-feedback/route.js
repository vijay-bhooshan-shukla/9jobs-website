import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import InterviewFeedback from '@/models/InterviewFeedback';

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.companyName || !data.contactName || !data.email) {
      return NextResponse.json({ error: 'Company Name, Contact Name, and Email are required.' }, { status: 400 });
    }

    await connectDB();

    const feedback = new InterviewFeedback(data);
    await feedback.save();

    return NextResponse.json({ success: true, message: 'Feedback submitted successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error saving interview feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
