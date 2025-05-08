
import { useState } from 'react';

export default function Home() {
  const [emotion, setEmotion] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [tone, setTone] = useState('Sad');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');

    const prompt = `Write a 60-second emotional Instagram reel script in ${language} with a ${tone} tone. Topic: ${emotion}. Also provide:
1. AI Image Prompt
2. Background Music Suggestion
3. 5 Hashtags
4. Voice-over style`;

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Emotion-to-Reel Script Generator</h1>

      <input
        type="text"
        placeholder="Enter your emotion (e.g. माँ की ममता)"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        className="p-2 w-full max-w-md border rounded mb-2"
      />

      <div className="flex gap-4 mb-2">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 border rounded">
          <option>Hindi</option>
          <option>English</option>
        </select>
        <select value={tone} onChange={(e) => setTone(e.target.value)} className="p-2 border rounded">
          <option>Sad</option>
          <option>Motivational</option>
          <option>Hopeful</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading || !emotion}
      >
        {loading ? 'Generating...' : 'Generate Script'}
      </button>

      {output && (
        <div className="bg-white p-4 rounded shadow mt-4 w-full max-w-2xl whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
