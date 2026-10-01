import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // ya built-in fetch use karein Node 18+ mein

const app = express();
app.use(cors());
app.use(express.json());

// Groq AI API Route
app.post('/api/medicine-details', async (req, res) => {
  const { medicineName } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_GROQ_API_KEY`, // Yahan apni Groq API Key dalein
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // ya llama-3.1-8b-instant
        messages: [
          {
            role: 'system',
            content: 'You are a medical assistant. Return the response strictly in JSON format with keys: name, subtitle, forms, category, strength, manufacturer, uses (array of strings), howItWorks (string), sideEffects (array of strings), precautions (array of strings), whenToDoctor (array of strings).'
          },
          {
            role: 'user',
            content: `Provide details for the medicine: ${medicineName}`
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    const parsedDetails = JSON.parse(data.choices[0].message.content);
    res.json(parsedDetails);

  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to fetch data from Groq AI' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));