const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

// We will inject the mock DB and the new endpoints right before the "VITE MIDDLEWARE SETUP" section
const insertionPoint = '// ------------------------------------------------------------------\n// VITE MIDDLEWARE SETUP';
const newCode = `// ------------------------------------------------------------------
// MOCK OPENVPM DATABASE
// ------------------------------------------------------------------
const mockDB = {
  clients: [
    { id: 'c1', practiceId: 'p1', name: 'Ján Novák', phone: '+421900111222', email: 'jan@example.com', languagePreference: 'SK', tags: ['dental', 'senior'], activeWellnessPlan: true },
    { id: 'c2', practiceId: 'p1', name: 'Kovács Anna', phone: '+36301112222', email: 'anna@example.com', languagePreference: 'HU', tags: ['fear-free-patient'], activeWellnessPlan: false },
    { id: 'c3', practiceId: 'p1', name: 'Peter Šťastný', phone: '+421900333444', email: 'peter@example.com', languagePreference: 'SK', tags: [], activeWellnessPlan: true },
  ],
  automations: [
    { id: 'a1', practiceId: 'p1', triggerEvent: 'visit_completed', name: 'Discharge Ask (Google Review)', isActive: true, actionType: 'sms', templatePrompt: 'Generate a polite SMS asking for a Google Review. Reference the pet\\'s good behavior.' },
    { id: 'a2', practiceId: 'p1', triggerEvent: 'visit_completed', name: 'Follow-up Education', isActive: true, actionType: 'email', templatePrompt: 'Generate an educational, non-alarming follow-up email about aftercare.' },
    { id: 'a3', practiceId: 'p1', triggerEvent: 'appointment_no_show', name: 'No-Show Rebooking', isActive: true, actionType: 'sms', templatePrompt: 'Send a polite, guilt-free rebooking SMS.' },
    { id: 'a4', practiceId: 'p1', triggerEvent: 'payment_failed', name: 'Wellness Plan Payment Failure', isActive: true, actionType: 'sms', templatePrompt: 'Generate an SMS prompting them to update their payment method.' },
  ],
  communicationsLog: [
    { id: 'l1', practiceId: 'p1', clientId: 'c1', automationId: 'a1', status: 'sent', timestamp: new Date(Date.now() - 86400000).toISOString(), channel: 'sms', messageContent: 'Dobrý deň, ďakujeme za návštevu...' }
  ],
  posts: [],
  templates: [],
  brandKits: [
    { id: 'bk1', clinicName: 'OpenVPM Pet Clinic', toneOfVoice: 'Fear-free, compassionate', phone: '+421900123456', website: 'https://openvpm.com' }
  ]
};

// ------------------------------------------------------------------
// OPENVPM REST API MOCK ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/clients', (req, res) => {
  res.json(mockDB.clients);
});

app.get('/api/automations', (req, res) => {
  res.json(mockDB.automations);
});

app.put('/api/automations/:id', (req, res) => {
  const index = mockDB.automations.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    mockDB.automations[index] = { ...mockDB.automations[index], ...req.body };
    res.json(mockDB.automations[index]);
  } else {
    res.status(404).json({ error: 'Automation not found' });
  }
});

app.get('/api/logs', (req, res) => {
  res.json(mockDB.communicationsLog);
});

// ------------------------------------------------------------------
// OPENVPM WEBHOOK LISTENER
// ------------------------------------------------------------------
app.post('/api/webhooks/openvpm', async (req, res) => {
  const { event, clientId, eventData } = req.body;
  // e.g. event: 'visit_completed', 'appointment_no_show', 'payment_failed'
  
  const client = mockDB.clients.find(c => c.id === clientId);
  if (!client) return res.status(404).json({ error: 'Client not found' });

  // Acknowledge webhook immediately
  res.json({ received: true });

  // Process triggers asynchronously
  const activeAutomations = mockDB.automations.filter(a => a.isActive && a.triggerEvent === event);
  
  for (const automation of activeAutomations) {
    // Specialized logic
    if (event === 'visit_completed' && automation.name.includes('Follow-up Education')) {
      if (!client.tags.includes('dental')) {
        continue; // Skip if no relevant tag (mocking specialized follow-up)
      }
    }

    if (event === 'visit_completed' && automation.name.includes('Discharge Ask')) {
      // Mocking 2 hour delay (using setTimeout in real app, but here just proceeding for demo)
      console.log(\`[Webhook] Scheduled 2-hour delay for Discharge Ask for client \${client.name}\`);
    }

    if (event === 'payment_failed') {
      // Flag client in CRM
      client.activeWellnessPlan = false;
    }

    // Call Gemini to generate message
    const prompt = \`
You are an expert veterinary communicator at \${mockDB.brandKits[0].clinicName}.
Generate a \${automation.actionType} message for client "\${client.name}".
Goal: \${automation.templatePrompt}
Event Context: \${JSON.stringify(eventData || {})}
Client Tags: \${client.tags.join(', ')}

CRITICAL AI GUARDRAILS:
1. Southern Slovakia Demographics: The output MUST be a JSON object containing both languages: Slovak ("sk") and Hungarian ("hu").
2. Fear-Free Tone: Ensure the tone is warm, professional, never fear-mongering, and provides no direct medical diagnoses.

Output strict JSON:
{
  "sk": "Slovak message text",
  "hu": "Hungarian message text"
}
\`;

    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      
      const rawText = response.text || '{}';
      let parsedJson;
      try {
        parsedJson = JSON.parse(rawText);
      } catch(e) {
        const match = rawText.match(/\\{[\\s\\S]*\\}/);
        parsedJson = match ? JSON.parse(match[0]) : { sk: rawText, hu: rawText };
      }

      const generatedMessage = client.languagePreference === 'HU' ? (parsedJson.hu || parsedJson.sk) : (parsedJson.sk || parsedJson.hu);

      // Mock SMS Gateway / Email sending
      console.log(\`\n===================================\`);
      console.log(\`[MOCK \${automation.actionType.toUpperCase()} GATEWAY]\`);
      console.log(\`To: \${client.name} (\${client.phone || client.email})\`);
      console.log(\`Language: \${client.languagePreference}\`);
      console.log(\`Message: \${generatedMessage}\`);
      console.log(\`===================================\n\`);

      // Log it
      mockDB.communicationsLog.unshift({
        id: 'l' + Date.now(),
        practiceId: client.practiceId,
        clientId: client.id,
        automationId: automation.id,
        status: 'sent',
        timestamp: new Date().toISOString(),
        channel: automation.actionType,
        messageContent: generatedMessage
      });

    } catch(err) {
      console.error('[Webhook AI Error]', err);
    }
  }
});

`;

serverCode = serverCode.replace(insertionPoint, newCode + '\n' + insertionPoint);
fs.writeFileSync('server.ts', serverCode);
console.log('Server updated');
