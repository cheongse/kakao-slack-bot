import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/kakao", async (req, res) => {
  const message = req.body?.userRequest?.utterance || "메시지 없음";

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `[카카오 문의]\n${message}`
    })
  });

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "문의가 접수되었습니다. 곧 답변드릴게요 🙂"
          }
        }
      ]
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
