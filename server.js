import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Agent is running");
});

app.post("/generate-reply", async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running"));
