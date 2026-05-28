const request = require("supertest");

describe("Vercel checkout API entrypoint", () => {
  let app;
  let createCheckoutSession;

  beforeEach(() => {
    jest.resetModules();

    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    delete process.env.MONGODB_URI;
    delete process.env.SENDGRID_API_KEY;

    process.env.STRIPE_SECRET_KEY = "sk_test_123";
    process.env.APP_BASE_URL = "https://9jobs.co";

    createCheckoutSession = jest.fn().mockResolvedValue({
      id: "cs_test_456",
      url: "https://checkout.stripe.com/c/pay/cs_test_456",
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

    app = require("../api/create-checkout-session");
  });

  afterEach(() => {
    jest.dontMock("stripe");
  });

  it("creates checkout sessions without booting auth or database services", async () => {
    const res = await request(app).post("/api/create-checkout-session").send({
      planName: "Trial",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      url: "https://checkout.stripe.com/c/pay/cs_test_456",
    });
    expect(createCheckoutSession).toHaveBeenCalledTimes(1);
  });

  it("routes Vercel checkout traffic to the dedicated checkout function", () => {
    const vercelConfig = require("../vercel.json");
    const checkoutRewrite = vercelConfig.rewrites.find(
      (rewrite) => rewrite.source === "/api/create-checkout-session"
    );

    expect(checkoutRewrite).toEqual({
      source: "/api/create-checkout-session",
      destination: "/api/create-checkout-session.js",
    });
  });
});
