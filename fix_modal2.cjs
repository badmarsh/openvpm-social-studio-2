const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

code = code.replace(/handleSaveText príspevkuEdit/g, 'handleSaveCaptionEdit');
code = code.replace(/isEditingText príspevku/g, 'isEditingCaption');
code = code.replace(/setIsEditingText príspevku/g, 'setIsEditingCaption');

fs.writeFileSync('src/components/PostDetailModal.tsx', code);
