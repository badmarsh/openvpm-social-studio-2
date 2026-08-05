const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  "navItems = [",
  `navItems = [
    { id: 'dashboard', label: 'Nástenka', icon: LayoutDashboard },
    { id: 'templates', label: 'Šablóny', icon: Grid },
    { id: 'wizard', label: 'AI Generátor', icon: Wand2 },
    { id: 'calendar', label: 'Kalendár', icon: Calendar },
    { id: 'crm', label: 'Klienti (CRM)', icon: UserCheck },
    { id: 'automations', label: 'Automatizácie', icon: Settings },
    { id: 'reviews', label: 'Recenzie', icon: MessageSquare },
    { id: 'brandkit', label: 'Brand Kit', icon: Settings }
  ]; //`
);
code = code.replace(/\{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard \},\s*\{ id: 'templates', label: 'Templates', icon: Grid \},\s*\{ id: 'wizard', label: 'AI Wizard', icon: Wand2 \},\s*\{ id: 'calendar', label: 'Calendar', icon: Calendar \},\s*\{ id: 'crm', label: 'Client CRM', icon: UserCheck \},\s*\{ id: 'automations', label: 'Automations', icon: Settings \},\s*\{ id: 'brandkit', label: 'Brand Kit', icon: Settings \}\s*\];/, '');
// Need to import MessageSquare
if (!code.includes('MessageSquare')) {
  code = code.replace('Stethoscope\n} from', 'Stethoscope,\n  MessageSquare\n} from');
}

code = code.replace('Embedded Practice Panel • Standalone Testing Phase 1', 'Vložený panel ambulancie • Fáza testovania');
code = code.replace('Veterinary Content Planner & AI Studio', 'Plánovač obsahu a AI štúdio');
code = code.replace('Viewing role', 'Zobrazenie role');
code = code.replace('>        Drafter', '>        Tvorca (Drafter)');
code = code.replace('>        Approver', '>        Schvaľovateľ');
code = code.replace('title="Drafter role: Front-desk & techs create and edit drafts"', 'title="Rola Tvorca: Recepcia a sestričky tvoria koncepty"');
code = code.replace('title="Approver role: Practice manager & vets approve, schedule, and publish"', 'title="Rola Schvaľovateľ: Manažér a lekári schvaľujú a publikujú"');

fs.writeFileSync('src/components/Header.tsx', code);
