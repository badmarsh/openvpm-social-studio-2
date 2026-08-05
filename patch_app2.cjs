const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importInjection = `
import { ReviewsView } from './components/ReviewsView';
`;

code = code.replace("import { ClientCRMView } from './components/ClientCRMView';", "import { ClientCRMView } from './components/ClientCRMView';" + importInjection);

const tabsInjection = `
        {currentTab === 'reviews' && <ReviewsView />}
`;

code = code.replace("{currentTab === 'crm' && <ClientCRMView />}", "{currentTab === 'crm' && <ClientCRMView />}" + tabsInjection);

code = code.replace('Connecting to OpenVPM Social Studio...', 'Pripájam sa do OpenVPM Social Studio...');
code = code.replace("Practice Manager (Approver)", "Manažér Ambulancie (Schvaľovateľ)");
code = code.replace("Clinic Staff (Drafter)", "Personál Kliniky (Tvorca)");

fs.writeFileSync('src/App.tsx', code);
