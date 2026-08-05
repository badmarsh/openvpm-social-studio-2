const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

code = code.replace(/Zatvoriť Window/g, 'Zatvoriť');
code = code.replace(/Delete Post/g, 'Vymazať príspevok');
code = code.replace(/Save as Koncept/g, 'Uložiť ako koncept');
code = code.replace(/Submit for Review/g, 'Poslať na schválenie');
code = code.replace(/Request changes note for drafter \(e\.g\. 'Please soften paragraph 2'\)/g, 'Pridajte poznámku (napr. \'Prosím zmierniť druhý odsek\')');
code = code.replace(/Mark Publikované/g, 'Označiť ako publikované');
code = code.replace(/> Approve/g, '> Schváliť');
code = code.replace(/Action Controls/g, 'Ovládacie prvky');
code = code.replace(/Viewing as Manager \/ Approver/g, 'Rola: Manažér / Schvaľovateľ');
code = code.replace(/Viewing as Staff Koncepter/g, 'Rola: Personál / Tvorca');
code = code.replace(/Status Change Audit History/g, 'História zmien stavu');
code = code.replace(/changed status to/g, 'zmenil/a stav na');
code = code.replace(/>Hashtags</g, '>Značky<');
code = code.replace(/Inline Edit/g, 'Upraviť text');
code = code.replace(/Save Edit/g, 'Uložiť zmeny');

fs.writeFileSync('src/components/PostDetailModal.tsx', code);
