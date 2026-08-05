const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

code = code.replace(
  "post.templateId && post.templateId.includes('edu')",
  "post.templateId && ['tpl_did_you_know', 'tpl_myth_vs_fact', 'tpl_when_to_call', 'tpl_seasonal_hazard'].includes(post.templateId)"
);

fs.writeFileSync('src/components/PostDetailModal.tsx', code);
