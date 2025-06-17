import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log request body for debugging
    console.log('📥 Request body:', JSON.stringify(req.body, null, 2));

    const messages = req.body.messages;

    // ✅ Check if messages is a valid array
    if (!Array.isArray(messages)) {
      console.error('❌ Invalid messages format:', messages);
      return res.status(400).json({ error: 'Expected prompt to be an array of messages' });
    }

    // Log API key presence (not the actual key)
    console.log('🔑 API Key present:', !!process.env.VITE_GEMINI_API_KEY);

    // Optional: Debug log to verify request body
    console.log('🟢 Gemini Request Body:', JSON.stringify({ contents: messages }, null, 2));

    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages // ✅ Must match Gemini format exactly
        }),
      }
    );

    // Check if Gemini API returned a valid response
    if (!result.ok) {
      const errorText = await result.text();
      console.error('❌ Gemini API error:', errorText);
      return res.status(result.status).json({ 
        error: errorText,
        status: result.status,
        statusText: result.statusText
      });
    }

    const data = await result.json();
    
    // Log successful response
    console.log('✅ Gemini API response:', JSON.stringify(data, null, 2));
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.status(200).json({ text });
  } catch (error) {
    console.error('❌ Server Error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack,
      type: error.constructor.name
    });
  }
}
