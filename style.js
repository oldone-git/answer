document.getElementById("jkhForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const userText = document.getElementById("userInput").value.trim();
  const commentsText = document.getElementById("comments").value.trim();
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");
  output.innerHTML = "";
  loading.style.display = "block";

  const prompt = `Сгенерируй официальный, вежливый и структурированный ответ от управляющей компании жильцу, на основе следующего текста обращения:

Обращение от жильца:
${userText}

Что нужно учесть:
${commentsText}

Ответ должен быть деловым, с уважительным тоном, можно использовать шаблон деловой переписки.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer sk-ВАШ_КЛЮЧ_ОТ_OPENROUTER", // ЗАМЕНИ НА СВОЙ
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content;
    output.innerText = answer || "⚠️ Не удалось сгенерировать ответ.";
  } catch (error) {
    console.error(error);
    output.innerText = "❌ Произошла ошибка. Проверьте подключение или ключ API.";
  } finally {
    loading.style.display = "none";
  }
});
