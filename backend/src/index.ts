import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT ?? 4000;
const ragAgentBaseUrl = process.env.RAG_AGENT_URL ?? 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/chat/ask', async (req, res) => {
  const { question, category = 'All' } = req.body ?? {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    const response = await fetch(`${ragAgentBaseUrl.replace(/\/$/, '')}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category }),
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

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
