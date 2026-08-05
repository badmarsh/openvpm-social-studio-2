const fs = require('fs');

let code = fs.readFileSync('src/lib/seedData.ts', 'utf8');

// For any object that has "category: 'Educational'", make sure its aspectRatios includes '16:9'
// We can just regex replace aspectRatios for Educational ones but it's simpler to parse/modify
// Since we don't have eval, let's just do targeted string replaces.

code = code.replace(
  "id: 'tpl_did_you_know',\n    category: 'Educational',\n    name: 'Did You Know?',\n    description: 'One true, non-diagnostic pet-health fact, framed as \"ask your vet,\" not definitive advice.',\n    platforms: ['IG', 'FB'],\n    aspectRatios: ['1:1', '4:5'],",
  "id: 'tpl_did_you_know',\n    category: 'Educational',\n    name: 'Did You Know?',\n    description: 'One true, non-diagnostic pet-health fact, framed as \"ask your vet,\" not definitive advice.',\n    platforms: ['IG', 'FB'],\n    aspectRatios: ['1:1', '4:5', '16:9'],"
);

code = code.replace(
  "id: 'tpl_myth_vs_fact',\n    category: 'Educational',\n    name: 'Myth vs. Fact',\n    description: 'A common pet-care myth followed by an accurate, non-alarming correction.',\n    platforms: ['IG', 'FB'],\n    aspectRatios: ['1:1', '4:5'],",
  "id: 'tpl_myth_vs_fact',\n    category: 'Educational',\n    name: 'Myth vs. Fact',\n    description: 'A common pet-care myth followed by an accurate, non-alarming correction.',\n    platforms: ['IG', 'FB'],\n    aspectRatios: ['1:1', '4:5', '16:9'],"
);

code = code.replace(
  "id: 'tpl_when_to_call',\n    category: 'Educational',\n    name: 'When to Call Us',\n    description: 'Non-diagnostic checklist of symptoms that warrant a call — explicitly not a medical diagnosis.',\n    platforms: ['IG', 'FB'],\n    aspectRatios: ['1:1', '4:5'],",
  "id: 'tpl_when_to_call',\n    category: 'Educational',\n    name: 'When to Call Us',\n    description: 'Non-diagnostic checklist of symptoms that warrant a call — explicitly not a medical diagnosis.',\n    platforms: ['IG', 'FB'],\n    aspectRatios: ['1:1', '4:5', '16:9'],"
);

// We need to verify if the TV Loop condition works.
// In PostDetailModal we did: `post.templateId && post.templateId.includes('edu')`
// Let's change the condition to check if the category is Educational or we can just rely on the template IDs. Wait, the template IDs are like `tpl_did_you_know` etc. None of them contain 'edu'!!
// Let's modify PostDetailModal to use the correct logic for TV Loop!

fs.writeFileSync('src/lib/seedData.ts', code);
