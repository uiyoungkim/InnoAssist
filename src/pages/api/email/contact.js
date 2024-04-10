import transporter from "./emailSetup";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const email =
        "seantylerstraub@gmail.com; uiyoungkim2002@gmail.com; innoAssist2024@gmail.com; ";
      const { subject, body } = req.body;
      let html = `<h2>${subject}</h2><pre>${body}</pre>`;

      const message = {
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: subject,
        text: body,
        html: html,
      };

      await transporter.sendMail(message);

      res.status(200).json({ message: "Email is sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
