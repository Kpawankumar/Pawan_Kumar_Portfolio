export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  res.status(200).json({
    emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY || "",
    emailjsServiceId: process.env.EMAILJS_SERVICE_ID || "",
    emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID || ""
  });
}
