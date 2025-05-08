export default async function handler(req, res) {
  const { prompt } = req.body;
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
}
