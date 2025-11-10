import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Sentiment from 'sentiment';

const app = express();
const port = process.env.PORT ?? 4000;
const ragAgentBaseUrl = process.env.RAG_AGENT_URL ?? 'http://localhost:8000';
const sentiment = new Sentiment();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/chat/ask', async (req, res) => {
  const { question, category = 'All', language = 'english' } = req.body ?? {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required.' });
  }
  const normalizedLanguage =
    typeof language === 'string' ? language.toLowerCase() : 'english';
  if (!['english', 'tunisian'].includes(normalizedLanguage)) {
    return res.status(400).json({ error: 'Language must be english or tunisian.' });
  }

  try {
    const response = await fetch(`${ragAgentBaseUrl.replace(/\/$/, '')}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category, language: normalizedLanguage }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: 'RAG agent returned an error.',
        statusText: response.statusText,
        body: text,
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error contacting RAG agent:', message);
    return res.status(502).json({ error: 'Failed to reach RAG agent.', message });
  }
});

app.post('/sentiment/analyze', (req, res) => {
  const { text } = req.body ?? {};

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required.' });
  }

  const analysis = sentiment.analyze(text);
  const label =
    analysis.score > 1 ? 'positive' : analysis.score < -1 ? 'negative' : 'neutral';

  return res.json({
    label,
    score: analysis.score,
    comparative: analysis.comparative,
    positive: analysis.positive,
    negative: analysis.negative,
    tokens: analysis.tokens,
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
