sed -i "s/name: 'Seasonal Offer',/name: 'Sezónna ponuka',/g" src/lib/seedData.ts
sed -i "s/description: 'Time-bound offer using brand-kit details. Never invent a discount amount.',/description: 'Časovo obmedzená ponuka, nikdy si nevymýšľajte výšku zľavy.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A clean promotional graphic highlighting {{offerTitle}} at {{clinicName}} with a call-to-book banner.',/promptSkeleton: 'Čistá propagačná grafika zvýrazňujúca ponuku {{offerTitle}} v {{clinicName}} s tlačidlom na objednanie.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Spring into wellness! During {{offerTitle}}, schedule your pet’s checkup and ask our team about preventative wellness benefits. \[\[insert specific offer details\]\]'/exampleCaption: 'Privítajte sezónu s lepším zdravím! Počas akcie {{offerTitle}} si naplánujte prehliadku vášho miláčika a opýtajte sa nášho tímu na výhody preventívnej starostlivosti. \[\[tu vložte konkrétne detaily ponuky\]\]'/g" src/lib/seedData.ts

sed -i "s/name: 'New Client Welcome',/name: 'Privítanie nových klientov',/g" src/lib/seedData.ts
sed -i "s/description: 'Welcoming invitation to book a first visit for new neighbors.',/description: 'Pozvánka na rezerváciu prvej návštevy pre nových obyvateľov a klientov.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A warm, inviting graphic welcoming new pets and families to {{clinicName}}.',/promptSkeleton: 'Vrúcna a pozývajúca grafika, ktorá víta nových pacientov a rodiny v ambulancii {{clinicName}}.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'New to the area or looking for a fear-free veterinary team? We are welcoming new patients! Visit {{website}} or call {{phone}} to schedule your first visit.'/exampleCaption: 'Ste v našom okolí noví, alebo hľadáte veterinárny tím s Fear-Free prístupom? Prijímame nových pacientov! Navštívte {{website}} alebo zavolajte na {{phone}} a naplánujte si prvú návštevu.'/g" src/lib/seedData.ts

sed -i "s/name: 'Holiday Hours',/name: 'Sviatočné otváracie hodiny',/g" src/lib/seedData.ts
sed -i "s/description: 'Clear, calm hours-change notice for upcoming holidays.',/description: 'Jasné oznámenie o zmene otváracích hodín počas nadchádzajúcich sviatkov.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A clear informational notice detailing clinic holiday hours for {{holidayName}}.',/promptSkeleton: 'Jasné informačné oznámenie o otváracích hodinách ambulancie počas sviatku {{holidayName}}.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Please note our upcoming clinic hours for {{holidayName}}:\\n• {{dateAndHours}}\\n\\nBe sure to request medication refills early so your pets stay covered!'/exampleCaption: 'Dávame do pozornosti otváracie hodiny našej ambulancie počas sviatku {{holidayName}}:\\n• {{dateAndHours}}\\n\\nNezabudnite si lieky a predpisy vyzdvihnúť vopred!'/g" src/lib/seedData.ts

sed -i "s/name: 'Urgent\/Emergency Care Hours',/name: 'Pohotovosť \/ Urgentná starostlivosť',/g" src/lib/seedData.ts
sed -i "s/description: 'Clear statement of after-hours availability. Never gives triage medical advice.',/description: 'Jasné uvedenie dostupnosti po pracovnej dobe. Nikdy tu neposkytujte zdravotné rady a triáž.',/g" src/lib/seedData.ts
sed -i "s/promptSkeleton: 'A bold, easy-to-read emergency contact and urgent care hours information card.',/promptSkeleton: 'Výrazná, ľahko čitateľná informačná karta s núdzovým kontaktom a hodinami urgentnej starostlivosti.',/g" src/lib/seedData.ts
sed -i "s/exampleCaption: 'Knowing where to turn in an emergency brings peace of mind. Here is our current urgent care availability and trusted partner emergency clinic details for after-hours care.'/exampleCaption: 'Vedieť, kam sa v núdzi obrátiť, prináša pokoj na duši. Tu je naša dostupnosť pre akútne stavy a detaily pohotovostnej kliniky našich partnerov pre starostlivosť mimo ordinačných hodín.'/g" src/lib/seedData.ts

