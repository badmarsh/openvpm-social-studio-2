sed -i "s/name: 'Meet the Team',/name: 'Zoznámte sa s Tímom',/g" src/lib/seedData.ts
sed -i "s/description: 'Warm intro to a named staff member: role, fun fact, why they love vet med.',/description: 'Vrelé predstavenie člena personálu: rola, zaujímavý fakt, prečo miluje veterinárnu medicínu.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A friendly staff spotlight card featuring {{memberName}}, {{role}}, with a soft warm background.',/promptSkeleton: 'Priateľská vizitka zamestnanca s {{memberName}}, {{role}}, s jemným teplým pozadím.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Meet {{memberName}}, our {{role}}! Fun fact: {{funFact}}. \"My favorite part of working at {{clinicName}} is building lifelong bonds with our patients and making vet visits fear-free!\"'/exampleCaption: 'Zoznámte sa s {{memberName}}, náš\/naša {{role}}! Zaujímavosť: {{funFact}}. \"Mojou najobľúbenejšou časťou práce v {{clinicName}} je budovanie celoživotných väzieb s našimi pacientmi a snaha robiť návštevy u veterinára bez strachu!\"'/g" src/lib/seedData.ts

sed -i "s/name: 'Day in the Life',/name: 'Deň v našej ambulancii',/g" src/lib/seedData.ts
sed -i "s/description: 'Upbeat behind-the-scenes montage feel, no graphic medical imagery.',/description: 'Pozitívny zostrih zo zákulisia, žiadne grafické lekárske zábery.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'Behind the scenes montage clip showing morning prep, cozy treat stations, and team smiles.',/promptSkeleton: 'Zostrih zo zákulisia zobrazujúci ranné prípravy, miesta s pamlskami a úsmevy tímu.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Ever wondered what happens behind the scenes at {{clinicName}}? From morning patient belly rubs to organizing gentle recovery suites, our team puts heart into every moment.'/exampleCaption: 'Zaujímalo vás niekedy, čo sa deje za zatvorenými dverami v {{clinicName}}? Od ranného škrabkania pacientov až po organizovanie pohodlných priestorov na zotavenie, náš tím dáva srdce do každého okamihu.'/g" src/lib/seedData.ts

sed -i "s/name: 'New Service Announcement',/name: 'Nová služba v ambulancii',/g" src/lib/seedData.ts
sed -i "s/description: 'Announce a new service or equipment in benefit-focused language.',/description: 'Oznámenie o novej službe alebo vybavení so zameraním na výhody pre pacienta.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'An announcement graphic introducing {{serviceName}} with modern, gentle medical imagery.',/promptSkeleton: 'Grafika oznamujúca novú službu {{serviceName}} s modernými, jemnými lekárskymi obrázkami.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'We are thrilled to now offer {{serviceName}}! This allows our care team to evaluate your pet with even greater precision and comfort. Tap the link in bio or call us to learn more.'/exampleCaption: 'Sme nadšení, že teraz môžeme ponúknuť {{serviceName}}! To umožňuje nášmu tímu vyšetriť vášho miláčika s ešte väčšou presnosťou a komfortom. Kliknite na odkaz v biu alebo nám zavolajte, ak sa chcete dozvedieť viac.'/g" src/lib/seedData.ts

sed -i "s/name: 'Practice Milestone',/name: 'Výročie \/ Míľnik ambulancie',/g" src/lib/seedData.ts
sed -i "s/description: 'Celebrate an anniversary or community milestone with your clients.',/description: 'Oslava výročia alebo komunitného míľnika s vašimi klientmi.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A celebratory graphic with soft festive accents marking {{milestoneText}}.',/promptSkeleton: 'Slávnostná grafika s jemnými sviatočnými prvkami, ktorá oslavuje {{milestoneText}}.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'We are celebrating {{milestoneText}}! Thank you to our incredible pet community for trusting us with your pets’ care year after year. We could not do this without you!'/exampleCaption: 'Oslavujeme {{milestoneText}}! Ďakujeme našej neuveriteľnej komunite majiteľov zvierat za to, že nám zverili starostlivosť o svojich miláčikov. Bez vás by sme to nedokázali!'/g" src/lib/seedData.ts

