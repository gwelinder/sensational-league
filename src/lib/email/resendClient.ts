import { Resend } from "resend";

let _resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!_resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    _resendClient = new Resend(apiKey);
  }
  return _resendClient;
}

// Export a proxy that lazily initializes the client
export const resendClient = new Proxy({} as Resend, {
  get(_target, prop) {
    const client = getResendClient();
    const value = client[prop as keyof Resend];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
