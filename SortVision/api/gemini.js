const fetch = require('node-fetch');

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const KEY = process.env.VITE_GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt: messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
    const r = await fetch(`${GEMINI_ENDPOINT}?key=${KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: messages }) // ✅ pass the array directly
    });

    const d = await r.json();

    const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) return res.status(204).send(); // Gemini replied with nothing

    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
