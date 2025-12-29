const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());


// GET 테스트용
app.get("/kakao", (req, res) => {
  res.send("kakao webhook alive");
});

// POST (카카오 실제 호출)
app.post("/kakao", async (req, res) => {
  const userMessage = req.body?.userRequest?.utterance || "메시지 없음";

  await axios.post(process.env.process.env.SLACK_BOT_TOKEN
, {
    text: `[카카오 문의]\n${userMessage}`
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
