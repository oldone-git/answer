document.getElementById("jkhForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const userInput = document.getElementById("userInput").value.trim();
  const comments = document.getElementById("comments").value.trim();
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");

  output.innerText = "";
  loading.style.display = "block";

  const prompt = `
На основе обращения жильца и комментариев сгенерируй официальный, деловой и вежливый ответ в письменной форме.

Обращение:
${userInput}

Замечания и особенности, которые нужно учесть:
${comments}
`;

  try {
    const response = await fetch("https://answer2.vercel.app/api/openrouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    output.innerText =
      data.choices?.[0]?.message?.content || "⚠️ Ответ не удалось получить.";

  } catch (error) {
    console.error("Ошибка:", error);
    output.innerText = "❌ Ошибка при генерации. Попробуйте позже.";
  } finally {
    loading.style.display = "none";
  }
});
