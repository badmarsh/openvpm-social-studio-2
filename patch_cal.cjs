const fs = require('fs');
let code = fs.readFileSync('src/components/CalendarView.tsx', 'utf8');

code = code.replace(/Content Calendar/g, 'Kalendár Obsahu');
code = code.replace(/Manage and reschedule your upcoming posts./g, 'Spravujte a plánujte svoje nadchádzajúce príspevky.');
code = code.replace(/Plan New Post/g, 'Naplánovať nový príspevok');
code = code.replace(/Drafts/g, 'Koncepty');
code = code.replace(/In Review/g, 'Na Schválenie');
code = code.replace(/Scheduled/g, 'Naplánované');
code = code.replace(/Published/g, 'Publikované');
code = code.replace(/No posts scheduled for this day./g, 'Žiadne príspevky na tento deň.');
code = code.replace(/Platform/g, 'Platforma');

fs.writeFileSync('src/components/CalendarView.tsx', code);
