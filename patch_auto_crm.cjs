const fs = require('fs');

let crmCode = fs.readFileSync('src/components/ClientCRMView.tsx', 'utf8');
crmCode = crmCode.replace(/Client Directory/g, 'Adresár Klientov');
crmCode = crmCode.replace(/Read-only view of OpenVPM CRM contacts and tags./g, 'Zobrazenie CRM kontaktov a štítkov z OpenVPM (iba na čítanie).');
crmCode = crmCode.replace(/Client Name/g, 'Meno klienta');
crmCode = crmCode.replace(/Contact/g, 'Kontakt');
crmCode = crmCode.replace(/Language/g, 'Jazyk');
crmCode = crmCode.replace(/Tags/g, 'Značky');
crmCode = crmCode.replace(/Wellness Plan/g, 'Wellness Plán');
crmCode = crmCode.replace(/None/g, 'Žiadne');
crmCode = crmCode.replace(/Active/g, 'Aktívny');
crmCode = crmCode.replace(/Inactive/g, 'Neaktívny');
crmCode = crmCode.replace(/Loading OpenVPM Client Directory.../g, 'Načítavam adresár klientov OpenVPM...');
fs.writeFileSync('src/components/ClientCRMView.tsx', crmCode);

let autoCode = fs.readFileSync('src/components/AutomationDashboard.tsx', 'utf8');
autoCode = autoCode.replace(/Automation Hub/g, 'Centrum Automatizácie');
autoCode = autoCode.replace(/Manage OpenVPM triggers and AI-generated follow-ups./g, 'Spravujte OpenVPM spúšťače a AI generované follow-upy.');
autoCode = autoCode.replace(/Trigger/g, 'Spúšťač');
autoCode = autoCode.replace(/Action: Generate & Send/g, 'Akcia: Generovať a odoslať');
autoCode = autoCode.replace(/Loading Automations.../g, 'Načítavam automatizácie...');
autoCode = autoCode.replace(/Mock: Visit Completed/g, 'Mock: Návšteva ukončená');
autoCode = autoCode.replace(/Mock: No Show/g, 'Mock: Nedostavenie sa');
autoCode = autoCode.replace(/Mock: Payment Failed/g, 'Mock: Zlyhanie platby');
fs.writeFileSync('src/components/AutomationDashboard.tsx', autoCode);
