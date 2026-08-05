const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

code = code.replace(/Dashboard Overview/g, 'Prehľad');
code = code.replace(/Welcome back/g, 'Vitajte späť');
code = code.replace(/Let's plan some engaging content for/g, 'Naplánujme si zaujímavý obsah pre');

code = code.replace(/Quick Start Templates/g, 'Rýchly výber šablón');
code = code.replace(/Select a framework to generate your next post/g, 'Vyberte si šablónu pre váš ďalší príspevok');

code = code.replace(/Browse all/g, 'Prehliadať všetky');
code = code.replace(/Drafts/g, 'Koncepty');
code = code.replace(/Needs Review/g, 'Na schválenie');
code = code.replace(/Scheduled/g, 'Naplánované');
code = code.replace(/Published/g, 'Publikované');

code = code.replace(/Recent Content Workflow/g, 'Nedávny obsah');
code = code.replace(/Track your posts from draft to publication/g, 'Sledujte svoje príspevky od konceptu po publikáciu');

code = code.replace(/No posts in the pipeline yet./g, 'Zatiaľ žiadne príspevky.');
code = code.replace(/Start by generating a new draft above!/g, 'Začnite vytvorením nového konceptu vyššie!');
code = code.replace(/In Review/g, 'Na Schválenie');
code = code.replace(/>Review</g, '>Revízia<');
code = code.replace(/>Draft</g, '>Koncept<');
code = code.replace(/>Scheduled</g, '>Naplánované<');
code = code.replace(/>Published</g, '>Publikované<');

code = code.replace(/Drafts:/g, 'Koncepty:');

fs.writeFileSync('src/components/Dashboard.tsx', code);
