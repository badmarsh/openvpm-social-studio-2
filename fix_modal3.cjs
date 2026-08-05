const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

code = code.replace(/Kopírovať,\n  Check/g, 'Copy,\n  Check');
code = code.replace(/<Kopírovať /g, '<Copy ');

fs.writeFileSync('src/components/PostDetailModal.tsx', code);
