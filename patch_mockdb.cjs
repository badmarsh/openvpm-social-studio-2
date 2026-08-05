const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace(
  "{ id: 'a2', practiceId: 'p1', triggerEvent: 'visit_completed', name: 'Follow-up Education', isActive: true, actionType: 'email', templatePrompt: 'Generate an educational, non-alarming follow-up email about aftercare.' },",
  `{ id: 'a2', practiceId: 'p1', triggerEvent: 'visit_completed', name: 'Follow-up Education', isActive: true, actionType: 'email', templatePrompt: 'Generate an educational, non-alarming follow-up email about aftercare.' },
    { id: 'a5', practiceId: 'p1', triggerEvent: 'vaccine_due', name: 'Vaccine Reminders', isActive: true, actionType: 'sms', templatePrompt: 'Generate a warm reminder that a routine vaccine is due soon.' },`
);

fs.writeFileSync('server.ts', serverCode);
console.log('Mock DB updated');
