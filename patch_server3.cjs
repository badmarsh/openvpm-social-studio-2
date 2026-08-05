const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const injection = `
// ------------------------------------------------------------------
// REVIEWS & REPUTATION MOCK ENDPOINTS
// ------------------------------------------------------------------
const mockReviews = [
  { id: 'r1', author: 'Jozef Mak', rating: 5, text: 'Skvelý prístup pána doktora, náš Rex sa vôbec nebál.', date: new Date(Date.now() - 86400000).toISOString(), reply: null },
  { id: 'r2', author: 'Katarína Nová', rating: 3, text: 'Ceny sú trochu vysoké, ale inak dobrá starostlivosť.', date: new Date(Date.now() - 172800000).toISOString(), reply: null },
  { id: 'r3', author: 'Tóth Gábor', rating: 1, text: 'Veľmi dlhé čakanie napriek objednaniu!', date: new Date(Date.now() - 259200000).toISOString(), reply: null },
];

app.get('/api/reviews', (req, res) => {
  res.json(mockReviews);
});

app.post('/api/reviews/:id/reply', async (req, res) => {
  const review = mockReviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).json({ error: 'Review not found' });

  const prompt = \`
You are an expert veterinary practice manager at OpenVPM.
Draft a professional, diplomatic reply to this Google Review.
Reviewer: \${review.author}
Rating: \${review.rating}/5
Review Text: "\${review.text}"

CRITICAL GUARDRAILS:
1. Maintain boundaries on pricing complaints (don't apologize for value of medical care, but empathize).
2. Express empathy for patient loss or stress.
3. Always prioritize the patient's health.
4. Reply in Slovak (and add a polite greeting in Hungarian if the name sounds Hungarian or review is in Hungarian).
5. Tone: Professional, diplomatic, Fear-Free.

Draft the response text only, no JSON.
\`;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt
    });
    res.json({ success: true, draft: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI generation failed' });
  }
});

app.post('/api/reviews/:id/send-reply', (req, res) => {
  const review = mockReviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).json({ error: 'Review not found' });
  review.reply = req.body.replyText;
  res.json({ success: true, review });
});

// ------------------------------------------------------------------
// POSTIZ / MIXPOST MOCK PUBLISHING ENDPOINT
// ------------------------------------------------------------------
app.post('/api/publish/postiz', (req, res) => {
  const { postId, imageUrl, caption, platforms } = req.body;
  console.log(\`[POSTIZ MOCK] Publishing post \${postId} to \${platforms.join(', ')}\`);
  console.log(\`Caption: \${caption}\`);
  console.log(\`Image: \${imageUrl.substring(0, 30)}...\`);
  
  // In a real integration, we'd make an HTTP request to Postiz API here.
  res.json({ success: true, publishedUrl: 'https://postiz.local/p/' + postId });
});
`;

serverCode = serverCode.replace('// ------------------------------------------------------------------\n// VITE MIDDLEWARE SETUP', injection + '\n// ------------------------------------------------------------------\n// VITE MIDDLEWARE SETUP');

// Also update the mock DB for Slovak translation of Automations
serverCode = serverCode.replace("'Discharge Ask (Google Review)'", "'Žiadosť o recenziu (Google)'");
serverCode = serverCode.replace("'Follow-up Education'", "'Edukácia po návšteve'");
serverCode = serverCode.replace("'Vaccine Reminders'", "'Pripomienka vakcinácie'");
serverCode = serverCode.replace("'No-Show Rebooking'", "'Preobjednanie (No-Show)'");
serverCode = serverCode.replace("'Wellness Plan Payment Failure'", "'Zlyhanie platby (Wellness Plán)'");


fs.writeFileSync('server.ts', serverCode);
console.log('Server API endpoints added');
