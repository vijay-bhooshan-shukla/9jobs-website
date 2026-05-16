"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="fj-container">
      <CheckCircle size={80} color="#4ade80" style={{ margin: '0 auto 24px' }} />
      <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Payment Successful!</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 32px' }}>
        Thank you for your purchase. Your plan has been activated. We've sent a confirmation email to your registered address.
      </p>
      <Link href="/" className="fj-button fj-button--dark">
        Go to Dashboard <ArrowRight size={17} style={{ marginLeft: '8px' }} />
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="fj-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
