require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const systemMessage = {
  role: "system",
  content: "You are GandhigramBot, the helpful AI assistant for Gandhigram University. Answer questions about courses, admissions, facilities, staff, contact info, etc.",
};

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, { role: "user", content: userMessage }]
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
