const fs = require('fs');
let code = fs.readFileSync('src/components/GenerationWizard.tsx', 'utf8');

code = code.replace(/setZnačky \(Hashtags\)/g, 'setHashtags');
code = code.replace(/copiedZnačky \(Hashtags\)/g, 'copiedHashtags');
code = code.replace(/setCopiedZnačky \(Hashtags\)/g, 'setCopiedHashtags');

fs.writeFileSync('src/components/GenerationWizard.tsx', code);
