export default async function handler(req, res) {
  // केवल POST अनुरोध स्वीकार करें
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // req.body को सुरक्षित रूप से एक्सेस करें
  const { prompt } = req.body || {};

  // यदि prompt उपलब्ध नहीं है, तो त्रुटि लौटाएं
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    // Gemini API को कॉल करें
    const apiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBA3sRkWzMOzYB-WQuVq4BOq8dnywUrZPg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const json = await apiRes.json();

    // परिणाम निकालें
    const result = json.candidates?.[0]?.content?.parts?.[0]?.text || 'No output received.';

    // सफल प्रतिक्रिया लौटाएं
    res.status(200).json({ result });
  } catch (error) {
    // त्रुटि हैंडलिंग
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

git add pages/api/generate.js
git commit -m "feat(api): add error handling to generate.js"
git push origin main
