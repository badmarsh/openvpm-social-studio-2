const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

code = code.replace(/editedText príspevku/g, 'editedCaption');
code = code.replace(/setEditedText príspevku/g, 'setEditedCaption');

fs.writeFileSync('src/components/PostDetailModal.tsx', code);
