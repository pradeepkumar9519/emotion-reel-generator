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
  const result = json.candidates?.[0]?.content?.parts?.[0]?.text || 'No output received.';
  res.status(200).json({ result });
}
