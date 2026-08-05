sed -i "s/name: 'Pet of the Week',/name: 'Pacient týždňa',/g" src/lib/seedData.ts
sed -i "s/description: 'Celebrate a client-submitted pet photo. REQUIRES photo-consent flag before use.',/description: 'Oslávte miláčika z fotky zaslanej klientom. PRED použitím vyžaduje súhlas s použitím fotky.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A cute \"Pet of the Week\" frame showcasing {{petName}} the {{breedOrSpecies}} with star accents.',/promptSkeleton: 'Roztomilý rámik \"Pacient týždňa\" predvádzajúci {{petName}}, plemeno\/druh: {{breedOrSpecies}} s doplnkami.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Meet {{petName}}, our Pet of the Week! {{petName}} brought so many smiles to our clinic during their routine visit. Give them a round of applause in the comments below! 🐾'/exampleCaption: 'Zoznámte sa s {{petName}}, naším pacientom týždňa! {{petName}} priniesol\/priniesla počas rutinnej návštevy do našej ambulancie toľko úsmevov. Venujte mu\/jej potlesk v komentároch nižšie! 🐾'/g" src/lib/seedData.ts

sed -i "s/name: 'Before\/After Grooming',/name: 'Pred a po úprave',/g" src/lib/seedData.ts
sed -i "s/description: 'Cosmetic transformation only, never implies medical outcome. REQUIRES consent flag.',/description: 'Iba kozmetická transformácia, nikdy nenaznačuje zdravotný výsledok. Vyžaduje súhlas klienta.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A 2-panel side-by-side cosmetic grooming transformation card for {{petName}}.',/promptSkeleton: 'Grafika pozostávajúca z dvoch častí, ktorá vedľa seba ukazuje kozmetickú zmenu {{petName}}.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Look at this fluffy spa day transformation! {{petName}} walked out feeling fresh and ready for cuddle time. Cosmetic grooming spa appointments fill up fast—book your pet’s pampering session today!'/exampleCaption: 'Pozrite sa na túto chlpatú premenu zo salónu! {{petName}} odišiel\/odišla svieži\/a a pripravený\/á na maznanie. Termíny pre kozmetickú úpravu sa rýchlo plnia — zarezervujte svojmu miláčikovi skrášľovanie ešte dnes!'/g" src/lib/seedData.ts

sed -i "s/name: 'Client Testimonial Card',/name: 'Recenzia od klienta',/g" src/lib/seedData.ts
sed -i "s/description: 'Quote-card layout for a REAL testimonial pasted in by staff. Never invent a quote.',/description: 'Dizajn s citátom pre SKUTOČNÚ recenziu pridanú personálom. Nikdy si recenziu nevymýšľajte.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'An elegant review quote card with 5 star ratings and a warm testimonial text layout.',/promptSkeleton: 'Elegantná grafika s hodnotením 5 hviezdičiek a rozložením pre text srdečnej recenzie.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: '\"{{pastedQuote}}\" — {{clientName}}\\n\\nThank you so much for your kind words! Our staff strives to treat every pet like our own.'/exampleCaption: '\"{{pastedQuote}}\" — {{clientName}}\\n\\nVeľmi pekne vám ďakujeme za milé slová! Náš personál sa snaží starať o každého pacienta ako o vlastného.'/g" src/lib/seedData.ts

sed -i "s/name: 'Engagement Poll',/name: 'Zábavná anketa',/g" src/lib/seedData.ts
sed -i "s/description: 'Light prompt with illustrated options for community interaction.',/description: 'Ľahká grafika s ilustrovanými možnosťami pre zapojenie komunity.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'An interactive question graphic asking {{pollQuestion}} with Option A vs Option B visual choices.',/promptSkeleton: 'Interaktívna grafika s otázkou {{pollQuestion}} s vizuálnymi možnosťami A a B.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Settling a friendly debate in the clinic today: Is your pet a morning alarm clock or a habitual snooze button presser? Drop an emoji below to vote! ⏰🐶🐱'/exampleCaption: 'Dnes v ambulancii riešime menšiu debatu: Funguje váš miláčik skôr ako ranný budík alebo rád stláča tlačidlo odloženia budíka? Pridajte emotikon a hlasujte! ⏰🐶🐱'/g" src/lib/seedData.ts

