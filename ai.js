const axios = require('axios');

async function askAI(text) {
  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a helpful WhatsApp AI assistant.' },
          { role: 'user', content: text }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (e) {
    return 'AI temporarily unavailable.';
  }
}

module.exports = { askAI };
