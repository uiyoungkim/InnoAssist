import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const prompt = req.body.prompt;
    const url = "https://api.openai.com/v1/images/generations";

    const response = await axios.post(
      url,
      {
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Sendet die Bild-URL in der Antwort zurück
    res.status(200).json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
