const fs = require('fs');

let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

content = content.replace(
  `  Stethoscope,\n  X\n} from 'lucide-react';`,
  `  Stethoscope,\n  X,\n  Mic,\n  Image as ImageIcon,\n  Map,\n  Video,\n  Bot\n} from 'lucide-react';`
);

content = content.replace(
  `        { id: 'wizard', label: 'AI Generátor', icon: Wand2 }\n      ]\n    },`,
  `        { id: 'wizard', label: 'AI Generátor', icon: Wand2 },\n        { id: 'media', label: 'AI Media Creator', icon: ImageIcon },\n        { id: 'competitor-analysis', label: 'Analýza Konkurencie', icon: Map }\n      ]\n    },`
);

content = content.replace(
  `        { id: 'crm', label: 'Klienti & Pacienti', icon: Users },\n        {\n          id: 'reviews',`,
  `        { id: 'crm', label: 'Klienti & Pacienti', icon: Users },\n        { id: 'telemedicine', label: 'Telemedicína', icon: Video },\n        { id: 'chatbot', label: 'AI Chatbot', icon: Bot },\n        {\n          id: 'reviews',`
);

content = content.replace(
  `        { id: 'canvas', label: 'AI Canvas (SOP)', icon: BookOpen }\n      ]\n    },`,
  `        { id: 'canvas', label: 'AI Canvas (SOP)', icon: BookOpen },\n        { id: 'scribe', label: 'AI Scribe (Záznamy)', icon: Mic }\n      ]\n    },`
);

fs.writeFileSync('src/components/Sidebar.tsx', content);

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = appContent.replace(
  `import { AICanvasView } from './components/AICanvasView';\nimport { PostDetailModal } from './components/PostDetailModal';`,
  `import { AICanvasView } from './components/AICanvasView';
import { AIMediaCreator } from './components/AIMediaCreator';
import { AIScribeView } from './components/AIScribeView';
import { CompetitorAnalysisView } from './components/CompetitorAnalysisView';
import { TelemedicineView } from './components/TelemedicineView';
import { ChatbotView } from './components/ChatbotView';
import { PostDetailModal } from './components/PostDetailModal';`
);

appContent = appContent.replace(
  `        {currentTab === 'canvas' && <AICanvasView brandKit={brandKit} role={role} />}\n        {currentTab === 'crm' && <ClientCRMView />}`,
  `        {currentTab === 'canvas' && <AICanvasView brandKit={brandKit} role={role} />}
        {currentTab === 'media' && <AIMediaCreator brandKit={brandKit} />}
        {currentTab === 'scribe' && <AIScribeView />}
        {currentTab === 'competitor-analysis' && <CompetitorAnalysisView />}
        {currentTab === 'telemedicine' && <TelemedicineView />}
        {currentTab === 'chatbot' && <ChatbotView />}
        {currentTab === 'crm' && <ClientCRMView />}`
);

fs.writeFileSync('src/App.tsx', appContent);
