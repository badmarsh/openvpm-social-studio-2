sed -i "s/name: 'Adoption\/Shelter Partner Spotlight',/name: 'Podpora útulkov a adopcií',/g" src/lib/seedData.ts
sed -i "s/description: 'Spotlight a partner shelter or adoptable pet with clear attribution to partner org.',/description: 'Upozornite na partnerský útulok alebo zvieratko na adopciu s jasným uvedením partnerskej organizácie.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A shelter spotlight card featuring {{partnerName}} and an adoptable pet photo.',/promptSkeleton: 'Karta na podporu útulku s logom {{partnerName}} a fotografiou zvieratka, ktoré hľadá domov.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Community Spotlight! We are proud to partner with {{partnerName}}. Meet {{petName}}, currently looking for a forever home! Contact {{partnerName}} directly for adoption details.'/exampleCaption: 'Sme hrdí na našu spoluprácu s útulkom {{partnerName}}. Zoznámte sa s {{petName}}, ktorý\/á aktuálne hľadá trvalý domov! Pre detaily o adopcii kontaktujte priamo {{partnerName}}.'/g" src/lib/seedData.ts

sed -i "s/name: 'Community Event Invite',/name: 'Pozvánka na podujatie',/g" src/lib/seedData.ts
sed -i "s/description: 'Open house \/ vaccine clinic \/ microchip event with date, time, and location fields.',/description: 'Deň otvorených dverí, očkovacia klinika alebo čipovanie s dôležitými poľami pre dátum, čas a miesto.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'An event flyer graphic for {{eventName}} on {{eventDate}} at {{clinicName}}.',/promptSkeleton: 'Informačný leták pre podujatie {{eventName}} dňa {{eventDate}} v {{clinicName}}.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Join us for {{eventName}}!\\n📅 Date: {{eventDate}}\\n⏰ Time: {{eventTime}}\\n📍 Location: {{clinicName}}\\n\\nStop by to meet the team, learn pet tips, and enjoy community fun!'/exampleCaption: 'Pridajte sa k nám na {{eventName}}!\\n📅 Dátum: {{eventDate}}\\n⏰ Čas: {{eventTime}}\\n📍 Miesto: {{clinicName}}\\n\\nPríďte spoznať náš tím, získať tipy a užiť si deň v komunite!'/g" src/lib/seedData.ts

sed -i "s/name: 'Quick Tip Reel',/name: 'Krátke video: Rýchly tip',/g" src/lib/seedData.ts
sed -i "s/description: '15-20s hook + one tip + CTA.',/description: '15-20 sekúnd na zaujatie pozornosti + jeden tip + CTA (výzva k akcii).',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'Short video concept: 15 second quick wellness tip.',/promptSkeleton: 'Koncept pre krátke video: 15-sekundový rýchly tip pre zdravie zvierat.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: '3 simple steps to keep your pup’s teeth clean at home! 🦷✨ Tap to learn more.'/exampleCaption: '3 jednoduché kroky, ako udržať zuby vášho psa čisté aj doma! 🦷✨ Kliknite a dozviete sa viac.'/g" src/lib/seedData.ts

sed -i "s/name: 'Meet-the-Vet Intro Reel',/name: 'Krátke video: Predstavenie lekára',/g" src/lib/seedData.ts
sed -i "s/description: 'Short, warm intro concept for a named vet.',/description: 'Krátky, teplý koncept pre predstavenie konkrétneho veterinára.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'Short video concept: Meet Dr. Sarah Lin in 20 seconds.',/promptSkeleton: 'Koncept pre krátke video: Spoznajte lekára za 20 sekúnd.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Get to know Dr. Sarah Lin! Why she chose vet med and her favorite patient stories.'/exampleCaption: 'Zoznámte sa s naším lekárom! Prečo si vybral veterinárnu medicínu a jeho obľúbené príbehy pacientov.'/g" src/lib/seedData.ts

sed -i "s/name: 'Patient Cuteness Reel',/name: 'Krátke video: Roztomilý pacient',/g" src/lib/seedData.ts
sed -i "s/description: 'Charming short clip featuring a consented patient photo animated to motion.',/description: 'Kúzelný krátky klip s animovanou fotkou pacienta so súhlasom majiteľa.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'Short video concept: Cute patient moment clip.',/promptSkeleton: 'Koncept pre krátke video: Krátky moment zo života našich pacientov.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'When the treat jar opens at Oakwood Vet! 🐾 Instant happiness.'/exampleCaption: 'Keď sa u nás v ambulancii otvorí nádoba s pamlskami! 🐾 Okamžité šťastie.'/g" src/lib/seedData.ts

sed -i "s/name: 'Procedure Explainer Reel',/name: 'Krátke video: Vysvetlenie zákroku',/g" src/lib/seedData.ts
sed -i "s/description: 'Plain-language explainer of a routine, non-graphic procedure to reduce client anxiety.',/description: 'Jednoducho vysvetlený bežný (nie krvavý\/grafický) zákrok pre zmiernenie stresu klienta.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'Short video concept: What happens during a routine dental cleaning.',/promptSkeleton: 'Koncept pre krátke video: Čo sa deje pri bežnom čistení zubov v narkóze.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Demystifying routine dental cleanings! Here is how we ensure your pet rests comfortably.'/exampleCaption: 'Vysvetľujeme, ako prebieha bežné dentálne čistenie! Tu je návod, ako zabezpečujeme, aby váš miláčik pohodlne odpočíval.'/g" src/lib/seedData.ts

