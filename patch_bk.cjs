const fs = require('fs');
let code = fs.readFileSync('src/components/BrandKitView.tsx', 'utf8');

code = code.replace(/Brand Kit Settings/g, 'Nastavenia Brand Kitu');
code = code.replace(/Configure your clinic's identity for AI generation./g, 'Nakonfigurujte identitu vašej ambulancie pre AI generovanie.');
code = code.replace(/Saving.../g, 'Ukladám...');
code = code.replace(/Save Changes/g, 'Uložiť zmeny');

code = code.replace(/Clinic Name/g, 'Názov ambulancie');
code = code.replace(/Tone of Voice/g, 'Tón komunikácie');
code = code.replace(/Primary Color \(Hex\)/g, 'Primárna farba (Hex)');
code = code.replace(/Primary Phone/g, 'Hlavný telefón');
code = code.replace(/Website URL/g, 'Webstránka');
code = code.replace(/Standard Medical Disclaimer/g, 'Štandardné medicínske upozornenie');

fs.writeFileSync('src/components/BrandKitView.tsx', code);
