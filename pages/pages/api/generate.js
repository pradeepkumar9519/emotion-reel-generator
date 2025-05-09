export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const apiKey = process.env.AIzaSyBA3sRkWzMOzYB-WQuVq4BOq8dnywUrZPg;

    const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyBA3sRkWzMOzYB-WQuVq4BOq8dnywUrZPg}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const json = await apiRes.json();
    const result = json.candidates?.[0]?.content?.parts?.[0]?.text || 'No output received.';
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
