export default async function handler(req, res) {
  // CORS-заголовки
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Обработка предварительного запроса (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { model, messages } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model, messages })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
