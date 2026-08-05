const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const importInjection = `
import { AutomationDashboard } from './components/AutomationDashboard';
import { ClientCRMView } from './components/ClientCRMView';
`;

code = code.replace("import { BrandKitView } from './components/BrandKitView';", "import { BrandKitView } from './components/BrandKitView';" + importInjection);

const tabsInjection = `
        {currentTab === 'crm' && <ClientCRMView />}
        {currentTab === 'automations' && <AutomationDashboard />}
`;

code = code.replace("{currentTab === 'brandkit' && (", tabsInjection + "        {currentTab === 'brandkit' && (");

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated');
