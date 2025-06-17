import fetch from 'node-fetch';

export const config = {
  runtime: 'edge',
  regions: ['iad1'], // US East (N. Virginia)
};

export default async function handler(req) {
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      }
    });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    console.log('📥 Request body:', JSON.stringify(body, null, 2));

    const messages = body.messages;

    // ✅ Check if messages is a valid array
    if (!Array.isArray(messages)) {
      console.error('❌ Invalid messages format:', messages);
      return new Response(JSON.stringify({ error: 'Expected prompt to be an array of messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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
          contents: messages
        }),
      }
    );

    // Check if Gemini API returned a valid response
    if (!result.ok) {
      const errorText = await result.text();
      console.error('❌ Gemini API error:', errorText);
      return new Response(JSON.stringify({ 
        error: errorText,
        status: result.status,
        statusText: result.statusText
      }), {
        status: result.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await result.json();
    
    // Log successful response
    console.log('✅ Gemini API response:', JSON.stringify(data, null, 2));
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('❌ Server Error:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack,
      type: error.constructor.name
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
