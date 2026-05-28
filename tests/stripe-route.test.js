const express = require("express");
const request = require("supertest");

describe("Stripe checkout route", () => {
  let app;
  let createCheckoutSession;

  beforeEach(() => {
    jest.resetModules();

    createCheckoutSession = jest.fn().mockResolvedValue({
      id: "cs_test_123",
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });
    jest.doMock("stripe", () =>
      jest.fn(() => ({
        checkout: {
          sessions: {
            create: createCheckoutSession,
          },
        },
      }))
    );

    process.env.STRIPE_SECRET_KEY = "sk_test_123";
    process.env.APP_BASE_URL = "https://9jobs.co";

    const stripeRouter = require("../server/routes/stripe");
    app = express();
    app.use(express.json());
    app.use("/", stripeRouter);
  });

  afterEach(() => {
    jest.dontMock("stripe");
  });

  it("creates checkout sessions from server-defined plan pricing", async () => {
    const res = await request(app).post("/api/create-checkout-session").send({
      planName: "Trial",
      price: "$1",
      period: "/ changed by client",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });

    const payload = createCheckoutSession.mock.calls[0][0];
    expect(payload).not.toHaveProperty("payment_method_types");
    expect(payload.line_items[0].price_data).toMatchObject({
      currency: "usd",
      unit_amount: 2500,
      product_data: {
        name: "9Jobs Trial Plan",
        description: "Trial plan - / 1 day",
      },
    });
    expect(payload.success_url).toBe(
      "https://9jobs.co/success?session_id={CHECKOUT_SESSION_ID}"
    );
    expect(payload.cancel_url).toBe("https://9jobs.co/pricing");
  });

  it("creates checkout sessions for the Resume Makeover plan", async () => {
    const res = await request(app).post("/api/create-checkout-session").send({
      planName: "Resume Makeover",
    });

    expect(res.statusCode).toBe(200);
    const payload = createCheckoutSession.mock.calls[0][0];
    expect(payload.line_items[0].price_data).toMatchObject({
      unit_amount: 4900,
      product_data: {
        name: "9Jobs Resume Makeover Plan",
        description: "Resume Makeover plan - one-time",
      },
    });
  });

  it("rejects unsupported checkout plans before calling Stripe", async () => {
    const res = await request(app).post("/api/create-checkout-session").send({
      planName: "Made Up",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Unsupported checkout plan." });
    expect(createCheckoutSession).not.toHaveBeenCalled();
  });
});
