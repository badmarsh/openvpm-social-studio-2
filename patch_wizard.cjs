const fs = require('fs');
let code = fs.readFileSync('src/components/GenerationWizard.tsx', 'utf8');

code = code.replace(/Cancel/g, 'Zrušiť');
code = code.replace(/Select a Template/g, 'Vyberte si šablónu');
code = code.replace(/Choose a framework below or start from scratch/g, 'Vyberte si rámec nižšie alebo začnite od nuly');
code = code.replace(/Back/g, 'Späť');
code = code.replace(/Draft Details/g, 'Detaily konceptu');
code = code.replace(/What is the specific topic/g, 'O čom by mal byť tento príspevok?');
code = code.replace(/e\.g\., Importance of heartworm prevention/g, 'napr. Dôležitosť prevencie proti srdcovým červom');
code = code.replace(/Any specific details/g, 'Máte konkrétne informácie na doplnenie?');
code = code.replace(/e\.g\., Mention our 10% off dental month promo/g, 'napr. Spomeňte našu 10% zľavu na dentálny mesiac');
code = code.replace(/Where will this be posted/g, 'Kde to bude publikované?');
code = code.replace(/Target Platforms/g, 'Cieľové platformy');
code = code.replace(/Generate AI Content/g, 'Generovať AI obsah');
code = code.replace(/Generating your content/g, 'Generujem váš obsah');
code = code.replace(/Connecting to Gemini/g, 'Pripájam sa k Gemini');

code = code.replace(/Review & Polish/g, 'Revízia a Úprava');
code = code.replace(/Generated Captions/g, 'Vygenerované texty');
code = code.replace(/Refine Selected Caption/g, 'Vylepšiť vybraný text');
code = code.replace(/Make it shorter, add more emojis, change tone.../g, 'Skrátiť, pridať emoji, zmeniť tón...');
code = code.replace(/Refine/g, 'Vylepšiť');
code = code.replace(/Copy to Clipboard/g, 'Kopírovať do schránky');
code = code.replace(/Copied!/g, 'Skopírované!');
code = code.replace(/Alt Text/g, 'Alternatívny text');
code = code.replace(/Hashtags/g, 'Značky (Hashtags)');

code = code.replace(/Visual Asset Generation/g, 'Generovanie vizuálu');
code = code.replace(/Image Prompt/g, 'Prompt pre obrázok');
code = code.replace(/Describe what the AI should generate/g, 'Popíšte, čo by mala AI vygenerovať');
code = code.replace(/Aspect Ratio/g, 'Pomer strán');
code = code.replace(/Generate Image/g, 'Generovať obrázok');
code = code.replace(/Generating Image.../g, 'Generujem obrázok...');
code = code.replace(/Save to OpenVPM Dashboard/g, 'Uložiť na Nástenku OpenVPM');
code = code.replace(/Send to Approver/g, 'Poslať schvaľovateľovi');

code = code.replace(/Client Consent Verification Required/g, 'Vyžaduje sa súhlas klienta');
code = code.replace(/This template implies featuring a specific patient or client/g, 'Táto šablóna naznačuje zobrazenie konkrétneho pacienta alebo klienta.');
code = code.replace(/I confirm we have signed media consent/g, 'Potvrdzujem, že máme podpísaný súhlas s médiami');

fs.writeFileSync('src/components/GenerationWizard.tsx', code);
