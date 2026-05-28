"use client";

import { CreditCard } from "lucide-react";

export default function PricingCheckoutButton({ plan, className }) {
  const handleCheckout = async () => {
    try {
      // Use relative path in production to avoid CORS/mixed-content issues.
      // In local development, fallback to the env var or localhost:5000.
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
      const apiBase = isLocal ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "") : "";
      
      const response = await fetch(`${apiBase}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: plan.name,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "Network response was not ok");
      }

      const session = await response.json();

      if (!session.url) {
        throw new Error("Stripe checkout URL was not returned");
      }

      window.location.href = session.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <button onClick={handleCheckout} className={className}>
      Pay Now <CreditCard size={17} style={{ marginLeft: '8px' }} />
    </button>
  );
}
