import { BrandKit, Template, Post } from '../types';

export const DEFAULT_PRACTICE_ID = 'practice_oakwood_vet';

export const DEFAULT_BRAND_KIT: BrandKit = {
  practiceId: DEFAULT_PRACTICE_ID,
  clinicName: 'Veterinárny lekár MVDr. Martin Sýkora',
  logoUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=200&q=80',
  primaryColor: '#0d9488', // Teal 600
  secondaryColor: '#f5f5f4', // Sand neutral
  fontStyle: 'warm',
  toneOfVoice: 'Súcitný, jasný, upokojujúci, komunitne orientovaný a ľahko pochopiteľný pre každého majiteľa zvieratka.',
  services: [
    'Wellness & Preventívna starostlivosť',
    'Komplexná dentálna starostlivosť',
    'Bežná a pokročilá chirurgia',
    'Interná diagnostika a digitálny RTG',
    'Starostlivosť o staršie zvieratá',
    'Čipovanie a vakcinácia'
  ],
  teamMembers: [
    {
      id: 'tm_1',
      name: 'MVDr. Martin Sýkora',
      role: 'Veterinárny lekár',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tm_2',
      name: 'Ján Novák',
      role: 'Veterinárny technik',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tm_3',
      name: 'Mária Kováčová',
      role: 'Koordinátorka',
      photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80'
    }
  ],
  address: 'Kvetná 3, Rimavská Sobota, Slovakia',
  phone: '0903 949 401',
  website: 'https://www.facebook.com/profile.php?id=100064552757713',
  disclaimerText: 'Len pre všeobecné informácie o zdraví zvierat. Vždy sa priamo poraďte s naším veterinárnym tímom pre personalizované lekárske hodnotenie alebo urgentnú triáž.'
};

export const SEED_TEMPLATES: Template[] = [
  // Preventive Care & Wellness
  {
    id: 'tpl_vaccine_reminder',
    category: 'Preventívna starostlivosť & Wellness',
    name: 'Pripomienka Očkovania/Odčervenia',
    description: 'Priateľská pripomienka pre špecifickú zanedbanú starostlivosť s miernou urgenciou a CTA na objednanie.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Príjemná grafika pripomínajúca majiteľom zvierat {{topic}} (napr. ochrana proti blchám/kliešťom). Teplé modrozelené a pieskové pozadie, usmievavý zdravý pes a mačka.',
    exampleCaption: 'Je váš miláčik chránený proti blchám a kliešťom na túto sezónu? Ochrana vašich chlpatých členov rodiny je najjednoduchšia, ak sa robí pravidelne. Zavolajte nám alebo sa objednajte online a skontrolujeme plán prevencie!'
  },
  {
    id: 'tpl_wellness_plan',
    category: 'Preventívna starostlivosť & Wellness',
    name: 'Zvýraznenie Wellness Plánu',
    description: 'Vysvetlenie jednej výhody wellness plánu jednoduchým jazykom bez vymýšľania cien.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Pozývajúca grafika zdôrazňujúca {{benefit}} (napr. preventívna dentálna prehliadka alebo ročný krvný obraz) ako súčasť plánu preventívnej starostlivosti.',
    exampleCaption: 'Naše komplexné Wellness plány zahŕňajú rutinné preventívne prehliadky a včasné zdravotné vyšetrenia, aby váš miláčik mal šťastný a aktívny život. [[vložte detaily plánu]]'
  },
  {
    id: 'tpl_senior_pet',
    category: 'Preventívna starostlivosť & Wellness',
    name: 'Pripomienka Prehliadky Pre Seniorov',
    description: 'Teplá, nealarmujúca pripomienka, že starším zvieratkám prospievajú prehliadky dvakrát ročne.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Jemný obrázok milujúceho staršieho Zlatého retrievera alebo mačky pohodlne odpočívajúcej vedľa pozorného člena veterinárneho personálu.',
    exampleCaption: 'Zvieratká starnú rýchlejšie ako my! Starším pacientom (7+ rokov) prospievajú preventívne prehliadky dvakrát ročne, aby sme včas zachytili aj nenápadné zmeny. Naplánujte si s nami vyšetrenie bez stresu ešte dnes.'
  },

  // Educational
  {
    id: 'tpl_did_you_know',
    category: 'Edukačné',
    name: 'Vedeli ste, že?',
    description: 'Jeden pravdivý, nediagnostický fakt o zdraví zvierat, formulovaný ako "spýtajte sa svojho veterinára", nie ako definitívna rada.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Edukačná grafika s otázkou "Vedeli ste, že?" ohľadom {{factTopic}} s hravou ilustráciou labky.',
    exampleCaption: 'Vedeli ste, že mačky sú majstri v maskovaní nepohodlia? Pravidelné a jemné prehliadky nám pomáhajú sledovať ich zdravie kĺbov a hydratáciu. Máte otázky? Opýtajte sa nášho tímu pri vašej ďalšej návšteve!'
  },
  {
    id: 'tpl_myth_vs_fact',
    category: 'Edukačné',
    name: 'Mýtus vs. Fakt',
    description: 'Bežný mýtus o starostlivosti o zvieratá nasledovaný presnou, nealarmujúcou korekciou.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Dvojdielna porovnávacia grafika vedľa seba: MÝTUS: {{mythText}} | FAKT: {{factText}}. Čisté rozloženie s tyrkysovými hlavičkami.',
    exampleCaption: 'MYTH: Dogs with warm, dry noses are always sick.\n\nFACT: A dog’s nose temperature fluctuates naturally throughout the day! Always look at activity level and appetite instead, and call us if you ever feel unsure.'
  },
  {
    id: 'tpl_when_to_call',
    category: 'Edukačné',
    name: 'Kedy nám zavolať',
    description: 'Nediagnostický kontrolný zoznam symptómov, ktoré vyžadujú telefonát — vyslovene to nie je lekárska diagnóza.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Čistá grafika so zoznamom nazvaným "Kedy by ste mali zavolať do našej ambulancie" uvádzajúca kľúčové indikátory zdravia.',
    exampleCaption: 'Not sure if your pet needs to be seen? Here are 4 signs it is time for a quick checkup:\n• Changes in drinking or eating habits\n• Persistent coughing or lethargy\n• Sudden mobility changes\n• Unexplained hiding behavior'
  },
  {
    id: 'tpl_seasonal_hazard',
    category: 'Edukačné',
    name: 'Sezónne Nástrahy',
    description: 'Upozornenie na sezónne nástrahy a praktický tip na prevenciu.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Sezónna grafika zdôrazňujúca bezpečnostné tipy týkajúce sa {{seasonOrHazard}} (napr. letné horúčavy, ochrana labiek alebo sviatočné jedovaté rastliny).',
    exampleCaption: 'Ako teploty stúpajú, asfalt sa rýchlo zahrieva! Vyskúšajte teplotu chodníka chrbtom ruky na 7 sekúnd. Ak je to príliš horúce pre vás, je to príliš horúce pre labky vášho psa.'
  },

  // Practice & Team
  {
    id: 'tpl_meet_team',
    category: 'Klinika & Tím',
    name: 'Zoznámte sa s Tímom',
    description: 'Vrelé predstavenie člena personálu: rola, zaujímavý fakt, prečo miluje veterinárnu medicínu.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Priateľská vizitka zamestnanca s {{memberName}}, {{role}}, s jemným teplým pozadím.',
    exampleCaption: 'Zoznámte sa s {{memberName}}, náš/naša {{role}}! Zaujímavosť: {{funFact}}. "Mojou najobľúbenejšou časťou práce v {{clinicName}} je budovanie celoživotných väzieb s našimi pacientmi a snaha robiť návštevy u veterinára bez strachu!"'
  },
  {
    id: 'tpl_day_in_life',
    category: 'Klinika & Tím',
    name: 'Deň v našej ambulancii',
    description: 'Pozitívny zostrih zo zákulisia, žiadne grafické lekárske zábery.',
    platforms: ['IG', 'Reels'],
    aspectRatios: ['9:16', '1:1'],
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Zostrih zo zákulisia zobrazujúci ranné prípravy, miesta s pamlskami a úsmevy tímu.',
    exampleCaption: 'Zaujímalo vás niekedy, čo sa deje za zatvorenými dverami v {{clinicName}}? Od ranného škrabkania pacientov až po organizovanie pohodlných priestorov na zotavenie, náš tím dáva srdce do každého okamihu.'
  },
  {
    id: 'tpl_new_service',
    category: 'Klinika & Tím',
    name: 'Nová služba v ambulancii',
    description: 'Oznámenie o novej službe alebo vybavení so zameraním na výhody pre pacienta.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Grafika oznamujúca novú službu {{serviceName}} s modernými, jemnými lekárskymi obrázkami.',
    exampleCaption: 'Sme nadšení, že teraz môžeme ponúknuť {{serviceName}}! To umožňuje nášmu tímu vyšetriť vášho miláčika s ešte väčšou presnosťou a komfortom. Kliknite na odkaz v biu alebo nám zavolajte, ak sa chcete dozvedieť viac.'
  },
  {
    id: 'tpl_milestone',
    category: 'Klinika & Tím',
    name: 'Výročie / Míľnik ambulancie',
    description: 'Oslava výročia alebo komunitného míľnika s vašimi klientmi.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1516453734593-8d198ae84bcf?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Slávnostná grafika s jemnými sviatočnými prvkami, ktorá oslavuje {{milestoneText}}.',
    exampleCaption: 'Oslavujeme {{milestoneText}}! Ďakujeme našej neuveriteľnej komunite majiteľov zvierat za to, že nám zverili starostlivosť o svojich miláčikov. Bez vás by sme to nedokázali!'
  },

  // Client & Patient Engagement
  {
    id: 'tpl_pet_of_week',
    category: 'Klientska interakcia',
    name: 'Pacient týždňa',
    description: 'Oslávte miláčika z fotky zaslanej klientom. PRED použitím vyžaduje súhlas s použitím fotky.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Roztomilý rámik "Pacient týždňa" predvádzajúci {{petName}}, plemeno/druh: {{breedOrSpecies}} s doplnkami.',
    exampleCaption: 'Zoznámte sa s {{petName}}, naším pacientom týždňa! {{petName}} priniesol/priniesla počas rutinnej návštevy do našej ambulancie toľko úsmevov. Venujte mu/jej potlesk v komentároch nižšie! 🐾',
    requiresConsent: true
  },
  {
    id: 'tpl_before_after',
    category: 'Klientska interakcia',
    name: 'Pred a po úprave',
    description: 'Iba kozmetická transformácia, nikdy nenaznačuje zdravotný výsledok. Vyžaduje súhlas klienta.',
    platforms: ['IG'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Grafika pozostávajúca z dvoch častí, ktorá vedľa seba ukazuje kozmetickú zmenu {{petName}}.',
    exampleCaption: 'Pozrite sa na túto chlpatú premenu zo salónu! {{petName}} odišiel/odišla svieži/a a pripravený/á na maznanie. Termíny pre kozmetickú úpravu sa rýchlo plnia — zarezervujte svojmu miláčikovi skrášľovanie ešte dnes!',
    requiresConsent: true
  },
  {
    id: 'tpl_testimonial_card',
    category: 'Klientska interakcia',
    name: 'Recenzia od klienta',
    description: 'Dizajn s citátom pre SKUTOČNÚ recenziu pridanú personálom. Nikdy si recenziu nevymýšľajte.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1554692997-c750694e211f?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Elegantná grafika s hodnotením 5 hviezdičiek a rozložením pre text srdečnej recenzie.',
    exampleCaption: '"{{pastedQuote}}" — {{clientName}}\n\nThank you so much for your kind words! Our staff strives to treat every pet like our own.',
    requiresQuoteInput: true,
    requiresConsent: true
  },
  {
    id: 'tpl_engagement_poll',
    category: 'Klientska interakcia',
    name: 'Zábavná anketa',
    description: 'Ľahká grafika s ilustrovanými možnosťami pre zapojenie komunity.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1596773356073-102dbd6ec032?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Interaktívna grafika s otázkou {{pollQuestion}} s vizuálnymi možnosťami A a B.',
    exampleCaption: 'Dnes v ambulancii riešime menšiu debatu: Funguje váš miláčik skôr ako ranný budík alebo rád stláča tlačidlo odloženia budíka? Pridajte emotikon a hlasujte! ⏰🐶🐱'
  },

  // Promotions & Announcements
  {
    id: 'tpl_seasonal_offer',
    category: 'Promo & Oznamy',
    name: 'Sezónna ponuka',
    description: 'Časovo obmedzená ponuka, nikdy si nevymýšľajte výšku zľavy.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1605263152648-522dbf9e9de2?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Čistá propagačná grafika zvýrazňujúca ponuku {{offerTitle}} v {{clinicName}} s tlačidlom na objednanie.',
    exampleCaption: 'Privítajte sezónu s lepším zdravím! Počas akcie {{offerTitle}} si naplánujte prehliadku vášho miláčika a opýtajte sa nášho tímu na výhody preventívnej starostlivosti. [[tu vložte konkrétne detaily ponuky]]'
  },
  {
    id: 'tpl_new_client',
    category: 'Promo & Oznamy',
    name: 'Privítanie nových klientov',
    description: 'Pozvánka na rezerváciu prvej návštevy pre nových obyvateľov a klientov.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Vrúcna a pozývajúca grafika, ktorá víta nových pacientov a rodiny v ambulancii {{clinicName}}.',
    exampleCaption: 'Ste v našom okolí noví, alebo hľadáte veterinárny tím s Fear-Free prístupom? Prijímame nových pacientov! Navštívte {{website}} alebo zavolajte na {{phone}} a naplánujte si prvú návštevu.'
  },
  {
    id: 'tpl_holiday_hours',
    category: 'Promo & Oznamy',
    name: 'Sviatočné otváracie hodiny',
    description: 'Jasné oznámenie o zmene otváracích hodín počas nadchádzajúcich sviatkov.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Jasné informačné oznámenie o otváracích hodinách ambulancie počas sviatku {{holidayName}}.',
    exampleCaption: 'Please note our upcoming clinic hours for {{holidayName}}:\n• {{dateAndHours}}\n\nBe sure to request medication refills early so your pets stay covered!'
  },
  {
    id: 'tpl_urgent_hours',
    category: 'Promo & Oznamy',
    name: 'Pohotovosť / Urgentná starostlivosť',
    description: 'Jasné uvedenie dostupnosti po pracovnej dobe. Nikdy tu neposkytujte zdravotné rady a triáž.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1626201389868-b80587d603a1?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Výrazná, ľahko čitateľná informačná karta s núdzovým kontaktom a hodinami urgentnej starostlivosti.',
    exampleCaption: 'Vedieť, kam sa v núdzi obrátiť, prináša pokoj na duši. Tu je naša dostupnosť pre akútne stavy a detaily pohotovostnej kliniky našich partnerov pre starostlivosť mimo ordinačných hodín.'
  },

  // Community & Events
  {
    id: 'tpl_adoption_partner',
    category: 'Komunita & Podujatia',
    name: 'Podpora útulkov a adopcií',
    description: 'Upozornite na partnerský útulok alebo zvieratko na adopciu s jasným uvedením partnerskej organizácie.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Karta na podporu útulku s logom {{partnerName}} a fotografiou zvieratka, ktoré hľadá domov.',
    exampleCaption: 'Sme hrdí na našu spoluprácu s útulkom {{partnerName}}. Zoznámte sa s {{petName}}, ktorý/á aktuálne hľadá trvalý domov! Pre detaily o adopcii kontaktujte priamo {{partnerName}}.'
  },
  {
    id: 'tpl_community_event',
    category: 'Komunita & Podujatia',
    name: 'Pozvánka na podujatie',
    description: 'Deň otvorených dverí, očkovacia klinika alebo čipovanie s dôležitými poľami pre dátum, čas a miesto.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Informačný leták pre podujatie {{eventName}} dňa {{eventDate}} v {{clinicName}}.',
    exampleCaption: 'Join us for {{eventName}}!\n📅 Date: {{eventDate}}\n⏰ Time: {{eventTime}}\n📍 Location: {{clinicName}}\n\nStop by to meet the team, learn pet tips, and enjoy community fun!'
  },

  // Reels / Video-first (Stubs)
  {
    id: 'tpl_quick_tip_reel',
    category: 'Reels / Video',
    name: 'Krátke video: Rýchly tip',
    description: '15-20 sekúnd na zaujatie pozornosti + jeden tip + CTA (výzva k akcii).',
    platforms: ['Reels', 'TikTok'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Koncept pre krátke video: 15-sekundový rýchly tip pre zdravie zvierat.',
    exampleCaption: '3 jednoduché kroky, ako udržať zuby vášho psa čisté aj doma! 🦷✨ Kliknite a dozviete sa viac.',
    isStub: true
  },
  {
    id: 'tpl_vet_intro_reel',
    category: 'Reels / Video',
    name: 'Krátke video: Predstavenie lekára',
    description: 'Krátky, teplý koncept pre predstavenie konkrétneho veterinára.',
    platforms: ['Reels', 'TikTok'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Koncept pre krátke video: Spoznajte lekára za 20 sekúnd.',
    exampleCaption: 'Zoznámte sa s naším lekárom! Prečo si vybral veterinárnu medicínu a jeho obľúbené príbehy pacientov.',
    isStub: true
  },
  {
    id: 'tpl_cuteness_reel',
    category: 'Reels / Video',
    name: 'Krátke video: Roztomilý pacient',
    description: 'Kúzelný krátky klip s animovanou fotkou pacienta so súhlasom majiteľa.',
    platforms: ['Reels', 'TikTok'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Koncept pre krátke video: Krátky moment zo života našich pacientov.',
    exampleCaption: 'Keď sa u nás v ambulancii otvorí nádoba s pamlskami! 🐾 Okamžité šťastie.',
    isStub: true
  },
  {
    id: 'tpl_procedure_explainer_reel',
    category: 'Reels / Video',
    name: 'Krátke video: Vysvetlenie zákroku',
    description: 'Jednoducho vysvetlený bežný (nie krvavý/grafický) zákrok pre zmiernenie stresu klienta.',
    platforms: ['Reels'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Koncept pre krátke video: Čo sa deje pri bežnom čistení zubov v narkóze.',
    exampleCaption: 'Vysvetľujeme, ako prebieha bežné dentálne čistenie! Tu je návod, ako zabezpečujeme, aby váš miláčik pohodlne odpočíval.',
    isStub: true
  }
];

export const INITIAL_DEMO_POSTS: Post[] = [
  {
    id: 'post_demo_1',
    practiceId: DEFAULT_PRACTICE_ID,
    templateId: 'tpl_vaccine_reminder',
    status: 'scheduled',
    createdBy: 'Marcus Vance (Tech)',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    scheduledTime: '10:00 AM',
    variants: {
      IG: {
        platform: 'IG',
        caption: 'Is your pet protected for the upcoming season? Flea, tick, and heartworm preventatives are essential year-round protection. Give Oakwood Veterinary Hospital a call today to review your pet’s wellness plan!',
        hashtags: ['#OakwoodVet', '#PetHealth', '#FleaAndTickPrevention', '#VetCare', '#AustinPets', '#WellnessExam'],
        mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '1:1',
        altText: 'Happy Golden Retriever receiving a friendly checkup at a veterinary clinic.'
      },
      FB: {
        platform: 'FB',
        caption: 'Is your pet protected for the upcoming season? Flea, tick, and heartworm preventatives are essential year-round protection. Give Oakwood Veterinary Hospital a call today to review your pet’s wellness plan!',
        hashtags: ['#OakwoodVet', '#PetWellness', '#AustinPets'],
        mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '1:1',
        altText: 'Happy Golden Retriever receiving a friendly checkup at a veterinary clinic.'
      }
    },
    reviewNotes: ['Approved by Dr. Sarah Lin on Monday morning.'],
    history: [
      {
        id: 'hist_1',
        status: 'draft',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        user: 'Marcus Vance',
        note: 'Created initial draft from template'
      },
      {
        id: 'hist_2',
        status: 'in_review',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        user: 'Marcus Vance',
        note: 'Submitted for manager review'
      },
      {
        id: 'hist_3',
        status: 'scheduled',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        user: 'Dr. Sarah Lin (Approver)',
        note: 'Approved and scheduled for Thursday at 10:00 AM'
      }
    ],
    overlayText: 'Protection Time! 🐾',
    hasWatermark: true
  },
  {
    id: 'post_demo_2',
    practiceId: DEFAULT_PRACTICE_ID,
    templateId: 'tpl_senior_pet',
    status: 'in_review',
    createdBy: 'Elena Rostova (Front Desk)',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    scheduledDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    scheduledTime: '02:00 PM',
    variants: {
      IG: {
        platform: 'IG',
        caption: 'Did you know senior pets benefit from twice-yearly checkups? As pets grow older, subtle health changes are easiest to support when detected early. We love taking care of our senior furry friends at Oakwood Vet!',
        hashtags: ['#SeniorPetCare', '#OakwoodVet', '#PawsomeSeniors', '#AustinVets', '#PetWellness'],
        mediaUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '4:5',
        altText: 'A cozy senior dog resting comfortably with gentle care.'
      }
    },
    reviewNotes: ['Elena: Added extra soft tone for senior pet parents.'],
    history: [
      {
        id: 'hist_4',
        status: 'draft',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        user: 'Elena Rostova',
        note: 'Drafted post for senior month spotlight'
      },
      {
        id: 'hist_5',
        status: 'in_review',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        user: 'Elena Rostova',
        note: 'Requested review from Dr. Lin'
      }
    ],
    overlayText: 'Cozy Senior Care 💛',
    hasWatermark: true
  },
  {
    id: 'post_demo_3',
    practiceId: DEFAULT_PRACTICE_ID,
    templateId: 'tpl_pet_of_week',
    status: 'draft',
    createdBy: 'Marcus Vance (Tech)',
    createdAt: new Date().toISOString(),
    scheduledDate: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
    scheduledTime: '11:30 AM',
    variants: {
      IG: {
        platform: 'IG',
        caption: 'Meet Milo, our Pet of the Week! 🐾 Milo came in for a routine checkup and charmed everyone in the lobby. Leave a star in the comments for Milo!',
        hashtags: ['#PetOfTheWeek', '#OakwoodPets', '#CuteDogAlert', '#AustinVetLife'],
        mediaUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '1:1',
        altText: 'Milo the fluffy puppy smiling at the camera.'
      }
    },
    hasConsent: true,
    reviewNotes: ['Client consent signed in clinic app.'],
    history: [
      {
        id: 'hist_6',
        status: 'draft',
        timestamp: new Date().toISOString(),
        user: 'Marcus Vance',
        note: 'Draft created with owner consent verified'
      }
    ],
    overlayText: 'Pet of the Week! ⭐',
    hasWatermark: true
  }
];

export const SEED_CANVAS_TEMPLATES: import('../types').CanvasTemplate[] = [
  {
    id: 'tpl_sop_intake',
    name: 'Klinický SOP: Prijatie pacienta',
    description: 'Štandardný operačný postup pre príjem pacienta v ambulancii s Fear-Free protokolom.',
    category: 'SOP',
    contentSkeleton: `<h1>Klinický Štandardný Operačný Postup (SOP): Prijatie Pacienta</h1>
<p><em>Verzia 2.4 | Platnosť od: 2026-01-01 | Schválil: MVDr. Sarah Lin</em></p>

<h2>1. Recepcia (Front Desk)</h2>
<ul>
  <li><strong>Privítanie klienta:</strong> Pozdravte klienta a zvieratko menom v pokojnom, nízkom tóne.</li>
  <li><strong>Fear-Free kontrola:</strong> Ponúknite feromónovú utierku (Adaptil pre psov, Feliway pre mačky) priamo na prepravku.</li>
  <li><strong>Overenie údajov:</strong> Skontrolujte kontaktné údaje a očkovací preukaz v systéme OpenVPM.</li>
</ul>

<h2>2. Veterinárny Techník (Vet Tech)</h2>
<ul>
  <li><strong>Váženie & Triage:</strong> Odvážte pacienta bez stresu (pamlsky na váhe). Zmerajte teplotu a tep.</li>
  <li><strong>Anamnéza:</strong> Zapíšte hlavné problémy zvieratka a doterajšiu liečbu do OpenVPM karty.</li>
</ul>

<h2>3. Veterinárny Lekár (Vet)</h2>
<ul>
  <li><strong>Klinické vyšetrenie:</strong> Vykonajte systematické vyšetrenie (nos-chvost) za prítomnosti majiteľa.</li>
  <li><strong>Plán starostlivosti:</strong> Vysvetlite diagnostiku a navrhnutú liečbu zrozumiteľným, nenaháňajúcim strach tónom.</li>
</ul>`
  },
  {
    id: 'tpl_financial_kpi',
    name: 'Finančný plán a KPIs',
    description: 'Strategický finančný model, cieľové tržby a diagram akvizície klientov.',
    category: 'Strategy',
    contentSkeleton: `<h1>Strategický Finančný Plán & KPIs 2026</h1>
<p>Prehľad finančných scenárov a akvizičného toku pre OpenVPM ambulanciu.</p>

<h2>1. Scenáre Tržieb (Revenue Scenarios)</h2>
<table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th style="padding: 8px;">Scenár</th>
      <th style="padding: 8px;">Mesačné Návštevy</th>
      <th style="padding: 8px;">Priemerný Účet (€)</th>
      <th style="padding: 8px;">Mesačný Obrat (€)</th>
      <th style="padding: 8px;">Cieľ Wellness Plánov</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">Konservatívny</td>
      <td style="padding: 8px;">320</td>
      <td style="padding: 8px;">65 €</td>
      <td style="padding: 8px;">20 800 €</td>
      <td style="padding: 8px;">45 aktivácií</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>Cieľový (Base Case)</strong></td>
      <td style="padding: 8px;"><strong>450</strong></td>
      <td style="padding: 8px;"><strong>78 €</strong></td>
      <td style="padding: 8px;"><strong>35 100 €</strong></td>
      <td style="padding: 8px;"><strong>80 aktivácií</strong></td>
    </tr>
    <tr>
      <td style="padding: 8px;">Rastový (Optimistický)</td>
      <td style="padding: 8px;">580</td>
      <td style="padding: 8px;">92 €</td>
      <td style="padding: 8px;">53 360 €</td>
      <td style="padding: 8px;">120 aktivácií</td>
    </tr>
  </tbody>
</table>

<h2>2. Akvizičný Tok Klientov (Aquisition Flowchart)</h2>
<pre class="mermaid">
graph TD
    A[Online Reklama / Google Recenzie] --> B[Sociálne Siete & Edukatívny Príspevok]
    B --> C[Rezervácia cez OpenVPM Portal]
    C --> D[Prvá Návšteva & Fear-Free Zážitok]
    D --> E[Aktivácia Ročného Wellness Plánu]
    E --> F[Lojálny Klient & Odporúčanie]
</pre>`
  },
  {
    id: 'tpl_hr_job_post',
    name: 'Pracovný Inzerát: Asistentka',
    description: 'Empaticky formulovaný pracovný inzerát pre veterinárneho asistenta s dôrazom na Fear-Free.',
    category: 'HR',
    contentSkeleton: `<h1>Pracovná pozícia: Veterinárny Asistent / Asistentka (Fear-Free)</h1>
<p><strong>Miesto práce:</strong> OpenVPM Pet Clinic | <strong>Druh pracovného pomeru:</strong> Plný úväzok / Skrátený úväzok</p>

<h2>O nás</h2>
<p>V OpenVPM Pet Clinic veríme, že návšteva veterinára nemusí byť spojená so stresom. Hľadáme empatického kolegu/kolegyňu, pre ktorého je pohoda zvierat a klientov na prvom mieste.</p>

<h2>Náplň práce</h2>
<ul>
  <li>Asistencia pri vyšetreniach a zákrokoch s využitím Fear-Free metodiky.</li>
  <li>Komunikácia s majiteľmi zvierat pri príjme a odovzdávaní pacientov.</li>
  <li>Starostlivosť o hospitalizovaných pacientov a príprava operačnej sály.</li>
  <li>Práca s veterinárnym softvérom OpenVPM.</li>
</ul>

<h2>Požiadavky</h2>
<ul>
  <li>Láskavý a trpezlivý prístup ku zvieratám.</li>
  <li>Zmysel pre detail, spoľahlivosť a tímový duch.</li>
  <li>Prax vo veterinárnej oblasti je výhodou, nie však podmienkou – radi vás zaškolíme!</li>
</ul>`
  },
  {
    id: 'tpl_client_handout',
    name: 'Klientsky edukačný leták',
    description: 'Dvojjazyčný (SK/HU) leták starostlivosti po operačnom zákroku.',
    category: 'Client_Handout',
    contentSkeleton: `<h1>Edukačný Leták: Starostlivosť po Operačnom Zákroku / Műtét utáni ápolás</h1>
<p>Dôležité pokyny pre majiteľov po prepustení pacienta z domácej opatery.</p>

<table border="1" style="width:100%; border-collapse: collapse;">
  <thead>
    <tr style="background-color: #0d9488; color: white;">
      <th style="padding: 10px; width: 50%;">Slovenský Jazyk (SK)</th>
      <th style="padding: 10px; width: 50%;">Magyar Nyelv (HU)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; vertical-align: top;">
        <h3>1. Odpočinok a Kľud</h3>
        <p>Pacienta umiestnite do teplej, tichej miestnosti bez prievanu. Zamedzte skákaniu na nábytok aspoň 7-10 dní.</p>
        <h3>2. Kŕmenie a Voda</h3>
        <p>Vodu podávajte v malých množstvách. Krmivo ponúknite až večer (polovičnú dávku), ak zviera nezvracia.</p>
        <h3>3. Kontrola Rany</h3>
        <p>Ranu udržujte čistú a suchú. Zamedzte lízaniu rany pomocou ochranného goliera.</p>
      </td>
      <td style="padding: 10px; vertical-align: top;">
        <h3>1. Pihenés és Nyugalom</h3>
        <p>Helyezze a beteget meleg, csendes, huzatment bútorra ugrálást legalább 7-10 napig kerülje.</p>
        <h3>2. Etetés és Itatás</h3>
        <p>Kis adagokban adjon vizet. Ételt csak este kínáljon (fél adagot), ha a kedvenc nem hány.</p>
        <h3>3. A Seb Ellenőrzése</h3>
        <p>Tartsa a sebet tisztán és szárazon. Akadályozza meg a seb nyalogatását védőgallérral.</p>
      </td>
    </tr>
  </tbody>
</table>`
  }
];

export const SEED_CANVAS_DOCUMENTS: import('../types').CanvasDocument[] = [
  {
    id: 'doc_1',
    practiceId: DEFAULT_PRACTICE_ID,
    title: 'Klinický SOP: Prijatie pacienta v ambulancii',
    content: SEED_CANVAS_TEMPLATES[0].contentSkeleton,
    status: 'published',
    authorId: 'user_1',
    authorName: 'MVDr. Sarah Lin',
    tags: ['SOP', 'Fear-Free', 'Recepcia'],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'doc_2',
    practiceId: DEFAULT_PRACTICE_ID,
    title: 'Finančný plán a KPIs 2026',
    content: SEED_CANVAS_TEMPLATES[1].contentSkeleton,
    status: 'draft',
    authorId: 'user_2',
    authorName: 'Marcus Vance',
    tags: ['Financie', 'Strategia', 'KPIs'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

